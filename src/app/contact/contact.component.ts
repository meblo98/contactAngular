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

  selectedContact: any = null; // Define the selectedContact property
  filteredContacts : any =null;
  searchTerm: string = ''; // Search term property

  ngOnInit(): void {
    this.loadContacts();
    this.filteredContacts = this.contacts; // Initialize filtered contacts with all contacts
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



  viewDetails(contact: any): void {
    this.selectedContact = contact;
  }

  closeDetails(): void {
    this.selectedContact = null;
  }
  searchContacts(): void {
    if (!this.searchTerm) {
      this.filteredContacts = this.contacts;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredContacts = this.contacts.filter(contact =>
        contact.nom.toLowerCase().includes(term) ||
        contact.prenom.toLowerCase().includes(term) ||
        contact.email.toLowerCase().includes(term) ||
        contact.telephone.toLowerCase().includes(term)
      );
    }
  }
}

