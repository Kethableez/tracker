import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BadgeContainerDirective } from '../directives/badge-container.directive';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'ktbz-avatar',
  templateUrl: 'avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, BadgeContainerDirective, TablerIconsModule],
})
export class AvatarComponent {
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() src?: string;
  @Input() text?: string;
  @Input() type: 'round' | 'square' = 'round';
  @Input() border = false;

  get variant() {
    if (this.src) return 'image';
    if (this.text) return 'text';
    return 'default';
  }

  get isRounded() {
    return this.type === 'round' ? 'avatar--rounded' : '';
  }

  get withBorder() {
    return this.border ? 'avatar--border' : '';
  }

  get avatarSize() {
    return `avatar--${this.size}`;
  }

  get iconClass() {
    return `icon--${this.size}`;
  }
}
