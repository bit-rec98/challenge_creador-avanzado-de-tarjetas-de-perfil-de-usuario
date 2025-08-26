import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserData } from '../../../core/models';

@Component({
  selector: 'app-user-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail-modal.component.html',
  styleUrl: './user-detail-modal.component.css',
})
export class UserDetailModalComponent {
  @Input() user: UserData | null = null;
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
