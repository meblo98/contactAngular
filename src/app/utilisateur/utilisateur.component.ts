import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isSignupMode: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  toggleForms() {
    this.isSignupMode = !this.isSignupMode;
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (this.authService.login(email, password)) {
        this.errorMessage = '';
        this.router.navigate(['/contact']);
        this.loginForm.reset();
        this.successMessage = 'Connexion réussie!';
      } else {
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    }
  }

  register() {
    if (this.signupForm.valid) {
      const { prenom, nom, email, tel, password } = this.signupForm.value;
      if (this.authService.register(`${prenom} ${nom}`, email, password, tel)) {
        this.errorMessage = '';
        this.successMessage = 'Inscription réussie!';
        this.toggleForms();
      } else {
        this.errorMessage = 'Une erreur est survenue lors de l\'inscription.';
      }
    }
  }
}
