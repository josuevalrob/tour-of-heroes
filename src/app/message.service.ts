import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];
// add() a message to the cache
  add(message: string) {
    this.messages.push(message);
  }
// clear() the cache
  clear() {
    this.messages = [];
  }
}