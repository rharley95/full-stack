
import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageListService } from './message-list.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageListService) { }

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangeEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
