import { Message } from '../message.model';
import { MOCKMESSAGES } from '../MOCKMESSAGES';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export class MessageListService {
    messages: Message[] = [];
    messageChangeEvent: EventEmitter<Message[]> = new EventEmitter<Message[]>();
    maxMessageId: number;

    constructor(private http: HttpClient) {
        this.initMessages();
    }

    addMessage(message: Message) {
        this.messages.push(message);
        this.storeMessages();
    }

    getMessages(): Message[] {
        return this.messages.slice();
    }

    initMessages(): void {
        this
            .http
            .get('https://romina-cms.firebaseio.com/messages.json')
            .subscribe((messages: Message[]) => {
                this.messages = messages;
                this.maxMessageId = this.getMaxId();
                this.messages.sort((current: Message, next: Message): number => {
                    if (current.id < next.id) {
                        return -1;
                    } else if (current.id === next.id) {
                        return 0;
                    } else {
                        return 1;
                    }
                });
                this.messageChangeEvent.next(this.messages.slice());
            }, (err: any) => {
                console.error(err);
            });
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

    getMaxId(): number {
        let maxId = 0;
        for (let message of this.messages) {
            let currentId = +message.id;
            if (currentId > maxId) {
                maxId = currentId;
            }
        }

        return maxId;
    }

    storeMessages(): void {
        let json = JSON.stringify(this.messages);
        let header = new HttpHeaders();
        header.set('Content-Type', 'application/json');
        this
            .http
            .put('https://romina-cms.firebaseio.com/messages.json', json, {
                headers: header
            }).subscribe(() => {
                this.messageChangeEvent.next((this.messages.slice()));
            });
    }


}
