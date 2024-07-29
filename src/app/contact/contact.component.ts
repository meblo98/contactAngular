import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetailContactComponent } from '../detail-contact/detail-contact.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule,DetailContactComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  telephone: string = '';
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  createdBy: string = '';
  updatedBy: string = '';
  description: string = '';
  contacts: { nom: string; prenom: string; email: string; telephone: string; createdAt: Date; updatedAt: Date; createdBy: string; updatedBy: string ; description: string }[] = [];

  selectedContact: any = null;
  filteredContacts: any[] = [];
  searchTerm: string = '';
  contactToEdit: any = null;

  ngOnInit(): void {
    this.loadContacts();
    this.filteredContacts = this.contacts;
  }

  addContact(): void {
    if (this.nom && this.prenom && this.email) {
      this.contacts.push({ nom: this.nom, prenom: this.prenom, email: this.email, telephone: this.telephone ,createdAt: new Date(), updatedAt: new Date(),createdBy: 'User1', updatedBy: 'User1', description: this.description });
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
      this.filteredContacts = this.contacts;
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


  editContact(contact: any): void {
    this.contactToEdit = { ...contact };
  }

  updateContact(): void {
    const index = this.contacts.findIndex(c => c.email === this.contactToEdit.email);
    if (index !== -1) {
      this.contacts[index] = this.contactToEdit;
      this.saveContacts();
      this.contactToEdit = null;
    }
  }

  closeEdit(): void {
    this.contactToEdit = null;
  }

}
