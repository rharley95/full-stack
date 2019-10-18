import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class ContactService {

    contactSelected = new EventEmitter<Contact>();

    contacts: Contact[] = [];

    constructor() {
        this.contacts = MOCKCONTACTS;
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

}
