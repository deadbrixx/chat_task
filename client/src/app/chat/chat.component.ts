import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { ChatService } from '../shared/chat.service';
import { Http } from '../../../node_modules/@angular/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  latitude = 17.387140;
  longitutde = 78.491684;

  @ViewChild('chatInput') chatInput: ElementRef;

  public messages = [];
  public connection;
  public message;
  gdata;
  username;

  constructor(private chatService: ChatService, public chathttp: Http) {
    this.get_groups();
   }

  get_groups() {
    this.chathttp.get('gapi/getgroup').subscribe(this.cb);
  }
  cb = (g) => {
    this.gdata = JSON.parse(g._body);
  }

  deletegrp(g) {
    const gobj = {_id: g};
    this.chathttp.post('gapi/deletegroup', gobj).subscribe(cb => {
      this. get_groups();
    })
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
