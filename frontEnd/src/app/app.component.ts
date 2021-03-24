import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(title: Title, meta: Meta) {
    title.setTitle('Crystal System Cleaning');
    meta.addTag({ name: 'Crystal System Cleaning', content: 'You Build It And We Clean It' })
  }
  //title = 'frontEnd';
}
