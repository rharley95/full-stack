import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Output() contactWasSelected = new EventEmitter<Contact>();

  contacts: Contact[] = [
    // tslint:disable-next-line: max-line-length
    new Contact('1', 'Bro. Jackson', 'jacksonk@byui.edu', '208-496-3771', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', null),
    // tslint:disable-next-line: max-line-length
    new Contact('2', 'Bro. Barzee', 'barzeer@byui.edu', '208-496-3768', 'https://web.byui.edu/Directory/Employee/barzeer.jpg', null)
  ];

  constructor() { }

  ngOnInit() {
  }

  onContactSelected(contact: Contact) {
    this.contactWasSelected.emit(contact);
  }
}


