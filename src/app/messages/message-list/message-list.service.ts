import { Message } from '../message.model';
import { MOCKMESSAGES } from '../MOCKMESSAGES';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MessageListService {
    messages: Message[] = [];
    messageChangeEvent = new EventEmitter<Message[]>();

    constructor() {
        this.messages = MOCKMESSAGES;
    }

    addMessage(message: Message) {
        this.messages.push(message);
        this.messageChangeEvent.emit(this.messages.slice());
    }

    getMessages(): Message[] {
        return this.messages.slice();
    }

    getMessage(id: string): Message {
        // tslint:disable-next-line: prefer-const
        for (let message of this.messages) {
            if (message.id === id) {
                return message;
            }
        }

        return null;
    }



}
