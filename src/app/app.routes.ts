import { Routes } from '@angular/router';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { ContactComponent } from './contact/contact.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/utilisateur', pathMatch: 'full' },
  { path: 'utilisateur', component: UtilisateurComponent },
  { path: 'contact', component: ContactComponent }
];
