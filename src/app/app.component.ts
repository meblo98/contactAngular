import { Component } from '@angular/core';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { RouterOutlet } from '@angular/router';
import { ContactComponent } from "./contact/contact.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactComponent,FormsModule,CommonModule,UtilisateurComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
