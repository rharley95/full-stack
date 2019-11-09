import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  originalContact: Contact;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = false;
      let id = params['id'];
      if (!id) {
        return;
      }

      let contact = this.contactService.getContact(id);
      if (!contact) {
        return;
      }

      this.originalContact = contact;
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(contact));

      if (contact.group) {
        this.groupContacts = contact.group.slice();
      }
    });
  }

  onSubmit(form: NgForm) {
    let contact = new Contact(
      form.value.id,
      form.value.name,
      form.value.email,
      form.value.phone,
      form.value.imageUrl,
      this.groupContacts
    );
    if (this.editMode === true) {
      this.contactService.updateContact(this.originalContact, contact);
    } else {
      this.contactService.addContact(contact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }

    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }

    return false;
  }



  addToGroup($event: any) {
    console.log($event.dragData);

    let selectedContact: Contact = $event.dragData;
    let invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx > this.groupContacts.length) {
      return;
    }

    this.groupContacts.splice(idx, 1);
  }
}


