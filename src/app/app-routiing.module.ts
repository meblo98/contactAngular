import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { ContactComponent } from "../app/contact/contact.component";

const routes: Routes = [
  { path: 'auth', component: UtilisateurComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
