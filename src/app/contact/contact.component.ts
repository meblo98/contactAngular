import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  telephone: string = '';
  createdAt: Date = new Date(); // date de création
  updatedAt: Date = new Date(); // date de modification
  createdBy: string = '';
  updatedBy: string = ''; // utilisateur
  description: string = '';
  contacts: { nom: string; prenom: string; email: string; telephone: string; createdAt: Date; updatedAt: Date; createdBy: string; updatedAtBy: string , description: string }[] = [];

  ngOnInit(): void {
    this.loadContacts();
  }

  addContact(): void {
    if (this.nom && this.prenom && this.email) {
      this.contacts.push({ nom: this.nom, prenom: this.prenom, email: this.email, telephone: this.telephone ,createdAt: new Date(), updatedAt: new Date(),createdBy: 'User1', updatedAtBy: 'User1', description: this.description });
      this.saveContacts();
      this.nom = '';
      this.prenom = '';
      this.email = '';
      this.telephone = '';
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.createdBy = 'User1';
      this.updatedBy = 'User1';
      this.description = '';

    }
  }

  saveContacts(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }
  }

  loadContacts(): void {
    if (typeof localStorage !== 'undefined') {
      const contacts = localStorage.getItem('contacts');
      if (contacts) {
        this.contacts = JSON.parse(contacts);
      }
    }
  }

  viewDetails(index: number): void {
    // Logic to view contact details
    alert(`Details for ${this.contacts[index].nom} ${this.contacts[index].prenom}`);
  }
}
