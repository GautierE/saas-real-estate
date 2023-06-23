import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  email: string = '';
  phone: string = '';
  message: string = '';
  isChecked: boolean = false;

  submitForm() {
    console.log('Form submitted');
    console.log('Email:', this.email);
    console.log('Phone:', this.phone);
    console.log('Message:', this.message);

    this.email = '';
    this.phone = '';
    this.message = '';
  }
}
