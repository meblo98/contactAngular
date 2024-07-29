import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetailContactComponent } from '../detail-contact/detail-contact.component';

interface Contact {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  description?: string;
}

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
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  filteredContacts: Contact[] = [];
  searchTerm: string = '';

  contactToEdit: any = null;

  showDeleted: boolean = false;

  constructor() {}


  ngOnInit(): void {
    this.loadContacts();
  }

  addContact(): void {
    if (this.nom && this.prenom && this.email) {
      const newContact: Contact = {
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        telephone: this.telephone,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'User1',
        updatedBy: 'User1',
        description: this.description
      };
      this.contacts.push(newContact);
      this.saveContacts();
      this.resetForm();
      this.updateFilteredContacts();
    }
  }

  saveContacts(): void {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  loadContacts(): void {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.contacts = JSON.parse(contacts);
      this.updateFilteredContacts();
    }
  }

  updateFilteredContacts(): void {
    if (this.showDeleted) {
      this.filteredContacts = this.contacts.filter(contact => contact.isDeleted);
    } else {
      this.filteredContacts = this.contacts.filter(contact => !contact.isDeleted);
    }
    this.searchContacts();
  }

  viewDetails(contact: Contact): void {
    this.selectedContact = contact;
  }

  closeDetails(): void {
    this.selectedContact = null;
  }

  searchContacts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredContacts = this.filteredContacts.filter(contact =>
      contact.nom.toLowerCase().includes(term) ||
      contact.prenom.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      contact.telephone.toLowerCase().includes(term)
    );
  }

  moveToTrash(contact: Contact): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir déplacer ce contact dans la corbeille ?');
    if (confirmation) {
      console.log('Contact avant suppression:', contact);
      const index = this.contacts.findIndex(c => c === contact);
      if (index !== -1) {
        this.contacts[index].isDeleted = true;
        this.saveContacts();
        this.updateFilteredContacts();
        console.log('Contact après suppression:', this.contacts[index]);
      }
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

// =======
  restoreContact(contact: Contact): void {
    const index = this.contacts.findIndex(c => c === contact);
    if (index !== -1) {
      this.contacts[index].isDeleted = false;
      this.saveContacts();
      this.updateFilteredContacts();
    }
  }

  showDeletedContacts(): void {
    this.showDeleted = !this.showDeleted;
    this.updateFilteredContacts();
  }

  getDeletedContacts(): Contact[] {
    return this.contacts.filter(contact => contact.isDeleted);
  }

  private resetForm(): void {
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
