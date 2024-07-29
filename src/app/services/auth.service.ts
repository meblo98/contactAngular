import { Injectable } from '@angular/core';

interface Utilisateur {
  id: number;
  prenom: string;
  email: string;
  password: string;
  nom: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersKey = 'users';
  private currentUserKey = 'currentUser';

  constructor() {}

  register(prenom: string, email: string, password: string, nom: string): boolean {
    const users = this.getUsers();
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const newUser: Utilisateur = { id, prenom, email, password, nom, createdAt: new Date() };
    users.push(newUser);
    this.saveUsers(users);
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): Utilisateur | null {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  private getUsers(): Utilisateur[] {
    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: Utilisateur[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
}
