import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable()
export class ContactService {
    contacts: Contact[] = [];
    contactSelected = new EventEmitter<Contact>();
    contactChangedEvent: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
    contactListChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();
    maxContactId: number;

    constructor(private http: HttpClient) {
        // this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
        this.getContacts();
    }

    getContacts(): void {
        this
            .http
            .get('https://romina-cms.firebaseio.com/contacts.json')
            .subscribe((contacts: Contact[]) => {
                this.contacts = contacts;
                this.maxContactId = this.getMaxId();
                this.contacts.sort((current: Contact, next: Contact): number => {
                    if (current.id < next.id) {
                        return -1;
                    } else if (current.id === next.id) {
                        return 0;
                    } else {
                        return 1;
                    }
                });
                this.contactListChangedEvent.next(this.contacts.slice());
            }, (err: any) => {
                console.error(err);
            });
    }

    getContact(id: string): Contact {

        // tslint:disable-next-line: prefer-const
        for (let contact of this.contacts) {
            if (contact.id === id) {
                return contact;
            }
        }

        return null;
    }

    deleteContact(contact: Contact): void {
        if (!contact) {
            return;
        }

        const pos = this.contacts.indexOf(contact);
        if (pos < 0) {
            return;
        }

        this.contacts.splice(pos, 1);
        this.storeContacts();

    }

    getMaxId() {
        let maxId = 0;
        for (let contact of this.contacts) {
            let currentId = +contact.id;
            if (currentId > maxId) {
                maxId = currentId;
            }
        }

        return maxId;
    }

    addContact(contact: Contact) {
        if (!contact) {
            return;
        }

        this.maxContactId++;
        contact.id = (this.maxContactId).toString();
        this.contacts.push(contact);
        this.storeContacts();
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) {
            return;
        }

        let pos = this.contacts.indexOf(originalContact);
        if (pos < 0) {
            return;
        }

        newContact.id = originalContact.id;
        this.contacts[pos] = newContact;
        this.storeContacts();
    }

    storeContacts(): void {
        let json = JSON.stringify(this.contacts);
        let header = new HttpHeaders();
        header.set('Content-Type', 'application/json');
        this
            .http
            .put('https://romina-cms.firebaseio.com/contacts.json', json, {
                headers: header
            }).subscribe(() => {
                this.contactListChangedEvent.next((this.contacts.slice()));
            });
    }

}
