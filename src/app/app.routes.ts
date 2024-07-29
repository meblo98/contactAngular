import { Routes } from '@angular/router';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './guards/auth.guard'; // Importer le AuthGuard

export const appRoutes: Routes = [
  { path: '', redirectTo: '/utilisateur', pathMatch: 'full' },
  { path: 'utilisateur', component: UtilisateurComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent }
];
