import { Component, OnInit } from '@angular/core';
import { MessageListService } from './message-list/message-list.service';
import { ContactService } from '../contacts/contact.service';

@Component({
  selector: 'cms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [MessageListService, ContactService]
})
export class MessagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
