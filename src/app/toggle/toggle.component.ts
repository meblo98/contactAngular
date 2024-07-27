import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-toggle',
  imports:[NgClass],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {

  checked = false;

  toggleForms() {
    document.querySelector('.form-signin')?.classList.toggle('form-signin-left');
    document.querySelector('.form-signup')?.classList.toggle('form-signup-left');
    document.querySelector('.frame')?.classList.toggle('frame-long');
    document.querySelector('.signup-inactive')?.classList.toggle('signup-active');
    document.querySelector('.signin-active')?.classList.toggle('signin-inactive');
    document.querySelector('.forgot')?.classList.toggle('forgot-left');
    document.querySelector('.btn')?.classList.remove('idle');
    document.querySelector('.btn')?.classList.add('active');
  }

  toggleSignup() {
    document.querySelector('.nav')?.classList.toggle('nav-up');
    document.querySelector('.form-signup-left')?.classList.toggle('form-signup-down');
    document.querySelector('.success')?.classList.toggle('success-left');
    document.querySelector('.frame')?.classList.toggle('frame-short');
  }

  toggleSignin() {
    document.querySelector('.btn-animate')?.classList.toggle('btn-animate-grow');
    document.querySelector('.welcome')?.classList.toggle('welcome-left');
    document.querySelector('.cover-photo')?.classList.toggle('cover-photo-down');
    document.querySelector('.frame')?.classList.toggle('frame-short');
    document.querySelector('.profile-photo')?.classList.toggle('profile-photo-down');
    document.querySelector('.btn-goback')?.classList.toggle('btn-goback-up');
    document.querySelector('.forgot')?.classList.toggle('forgot-fade');
  }

  goBack() {
    history.go(-1);
  }
}
