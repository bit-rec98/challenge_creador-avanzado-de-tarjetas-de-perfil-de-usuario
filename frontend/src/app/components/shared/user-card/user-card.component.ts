import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserData } from '../../../core/models';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() user!: UserData;
  @Output() cardClick = new EventEmitter<UserData>();

  onCardClick(): void {
    this.cardClick.emit(this.user);
  }
}
