import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
// The MessagesComponent should display all messages, 
// including the message sent by the HeroService when it fetches heroes.
export class MessagesComponent implements OnInit {

// parameter that declares a public messageService property.
constructor(public messageService: MessageService) {}
// The messageService property must be public because you're about to bind to it in the template.
  ngOnInit() {
  }

}
