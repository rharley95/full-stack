import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Message } from '../message.model';
import { MessageListService } from '../message-list/message-list.service';


@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  messageSender = '1';

  @ViewChild('subjectInput', {static: false}) subjectInputRef: ElementRef;
  @ViewChild('messageInput', {static: false}) messageInputRef: ElementRef;

  constructor(private messageService: MessageListService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.messageInputRef.nativeElement.value;
    const newMessage = new Message('00', subject, msgText, this.messageSender);

    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }

}
