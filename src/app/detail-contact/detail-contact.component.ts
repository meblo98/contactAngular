import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-contact.component.html',
  styleUrl: './detail-contact.component.css'
})
export class DetailContactComponent {
  @Input() contact: any;
  @Output() close = new EventEmitter<void>();

  

  closeDetails(): void {
    this.close.emit();
  }
}
