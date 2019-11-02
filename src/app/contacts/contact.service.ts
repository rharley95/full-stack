import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class ContactService {

    contactSelected = new EventEmitter<Contact>();
    contactChangedEvent: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
    contactListChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();
    maxContactId: number;

    contacts: Contact[] = [];

    constructor() {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
    }

    getContacts(): Contact[] {
        return this.contacts.slice();
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
        let contactsListClone = this.contacts.slice();
        this.contactChangedEvent.next(contactsListClone);

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
        let contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
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
        let contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
    }

}
