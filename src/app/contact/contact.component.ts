import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetailContactComponent } from '../detail-contact/detail-contact.component';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

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
  imports: [CommonModule, FormsModule, DetailContactComponent, NavbarComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(private router: Router) {}

  nom: string = '';
  prenom: string = '';
  email: string = '';
  telephone: string = '';
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  description: string = '';
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  filteredContacts: Contact[] = [];
  searchTerm: string = '';
  contactToEdit: Contact | null = null;
  currentUser: string = '';
  showDeleted: boolean = false;

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadContacts();
    this.filterContactsByUser();
  }

  loadCurrentUser(): void {
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUser = user;
      }
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/utilisateur']);
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
        createdBy: this.currentUser,
        updatedBy: this.currentUser,
        description: this.description
      };

      this.contacts.push(newContact);
      this.saveContacts();
      this.resetForm();
      this.filterContactsByUser();
    }
  }

  saveContacts(): void {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  loadContacts(): void {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      try {
        this.contacts = JSON.parse(contacts);
        this.updateFilteredContacts();
      } catch (error) {
        console.error('Erreur lors du parsing des contacts depuis le localStorage:', error);
        this.contacts = []; // Réinitialiser les contacts si l'erreur persiste
      }
    }
  }

  filterContactsByUser(): void {
    this.filteredContacts = this.contacts.filter(contact => contact.createdBy === this.currentUser && !contact.isDeleted);
  }

  updateFilteredContacts(): void {
    if (this.showDeleted) {
      this.filteredContacts = this.contacts.filter(contact => contact.createdBy === this.currentUser && contact.isDeleted);
    } else {
      this.filteredContacts = this.contacts.filter(contact => contact.createdBy === this.currentUser && !contact.isDeleted);
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
      const index = this.contacts.findIndex(c => c === contact);
      if (index !== -1) {
        this.contacts[index].isDeleted = true;
        this.saveContacts();
        this.updateFilteredContacts();
      }
    }
  }

  editContact(contact: Contact): void {
    this.contactToEdit = contact;
  }


  updateContact(): void {
    if (this.contactToEdit) {
      const index = this.contacts.findIndex(c => c.id === this.contactToEdit?.id);
      if (index !== 1) {
        // Mise à jour seulement des champs modifiés
        const updatedContact = this.contacts[index];
        updatedContact.nom = this.contactToEdit.nom;
        updatedContact.prenom = this.contactToEdit.prenom;
        updatedContact.email = this.contactToEdit.email;
        updatedContact.telephone = this.contactToEdit.telephone;
        updatedContact.description = this.contactToEdit.description;
        updatedContact.updatedAt = new Date();
        updatedContact.updatedBy = this.currentUser;

        this.saveContacts();
        this.contactToEdit = null;
        this.filterContactsByUser();
      }
    }
  }


  closeEdit(): void {
    this.contactToEdit = null;
  }

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

  private resetForm(): void {
    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.telephone = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.description = '';
  }
}
