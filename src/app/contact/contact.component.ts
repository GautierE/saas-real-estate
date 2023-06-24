import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  @ViewChild('contactForm', { static: false })
  contactForm!: NgForm;

  emailValue: string = '';
  phoneValue: string = '';
  message: string = '';
  isChecked: boolean = false;

  submitForm() {
    if (this.contactForm.invalid) {
      return;
    }

    console.log('Form submitted');
    console.log('Email:', this.emailValue);
    console.log('Phone:', this.phoneValue);
    console.log('Message:', this.message);

    this.contactForm.resetForm();
  }
}
