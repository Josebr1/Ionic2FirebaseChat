import { Message } from './../../models/message.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'message-box',
  templateUrl: 'message-box.html'
})
export class MessageBoxComponent {

  @Input() message: Message
  @Input() isFromSender: boolean;

  constructor() {
    
  }

}
