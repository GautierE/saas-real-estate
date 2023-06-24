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
  messageValue: string = '';
  isChecked: boolean = false;

  submitForm() {
    if (this.contactForm.invalid) {
      return;
    }

    const webhookData = {
      username: '🧑‍💼 Employer 🧑‍💼',
      avatar_url:
        'https://entreprise.pole-emploi.fr/static/img/minisite/skmp5Lhrm9qj5v5Dr9htjMdERmVQrSCk.png',
      embeds: [
        {
          title: '🎉🎉 Someone contacted you 🎉🎉',
          color: 0x00ffff,
          fields: [
            { name: 'Email', value: this.emailValue },
            { name: 'Phone', value: this.phoneValue },
            { name: 'Message', value: this.messageValue },
          ],
        },
      ],
    };

    fetch(
      'https://discord.com/api/webhooks/1122180918875000842/7fO6slD5_ERDQHdsLnFw9deajZxjtbD2DzbNJnfgvM1Hf5r4VsvYHypVvEovPETbDvQd',
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(webhookData),
      }
    );

    this.contactForm.resetForm();
  }
}
