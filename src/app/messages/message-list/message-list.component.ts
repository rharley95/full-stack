import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message('1', 'test', 'test', 'test'),
    new Message('2', 'test', 'test', 'test')
  ];

  constructor() { }

  ngOnInit() {
  }

  onSendMessage(message: Message) {
    this.messages.push(message);
    console.log(message);
  }
}
