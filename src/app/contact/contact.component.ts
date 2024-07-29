import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetailContactComponent } from '../detail-contact/detail-contact.component';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule,DetailContactComponent,NavbarComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(private router: Router){

  }
  nom: string = '';
  prenom: string = '';
  email: string = '';
  telephone: string = '';
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  description: string = '';
  contacts: { nom: string; prenom: string; email: string; telephone: string; createdAt: Date; updatedAt: Date; createdBy: string; updatedBy: string ; description: string }[] = [];

  selectedContact: any = null;
  filteredContacts: any[] = [];
  searchTerm: string = '';
  contactToEdit: any = null;

  currentUser: string = '';

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
  logout() {

    localStorage.removeItem('currentUser');

    // Rediriger vers la page de connexion
    this.router.navigate(['/utilisateur']);
  }
  addContact(): void {

    if (this.nom && this.prenom && this.email) {
      this.contacts.push({
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        telephone: this.telephone,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: this.currentUser,
        updatedBy: this.currentUser,
        description: this.description
      });
      this.saveContacts();
      this.nom = '';
      this.prenom = '';
      this.email = '';
      this.telephone = '';
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.description = '';
      this.filterContactsByUser();
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


  filterContactsByUser(): void {
    this.filteredContacts = this.contacts.filter(contact => contact.createdBy === this.currentUser);
  }

  viewDetails(contact: any): void {
    this.selectedContact = contact;
  }

  closeDetails(): void {
    this.selectedContact = null;
  }

  searchContacts(): void {
    if (!this.searchTerm) {
      this.filterContactsByUser();
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredContacts = this.contacts.filter(contact =>
        contact.createdBy === this.currentUser &&
        (contact.nom.toLowerCase().includes(term) ||
        contact.prenom.toLowerCase().includes(term) ||
        contact.email.toLowerCase().includes(term) ||
        contact.telephone.toLowerCase().includes(term))
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
