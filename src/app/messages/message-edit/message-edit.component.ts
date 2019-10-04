import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  currentSender = 'Romina Painter';

  @ViewChild('subjectInput', {static: false}) subjectInputRef: ElementRef;
  @ViewChild('messageInput', {static: false}) messageInputRef: ElementRef;

  @Output() messageAdded = new EventEmitter<Message>();

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.messageInputRef.nativeElement.value;
    const newMessage = new Message('1', subject, msgText, this.currentSender);

    this.messageAdded.emit(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }

}
