import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'ktbz-badge',
  templateUrl: 'badge.component.html',
  styleUrls: ['./badge.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class BadgeComponent {
  @Input() variant: 'normal' | 'success' | 'error' | 'warning' | 'info' =
    'normal';

  @Input() isAbsolute = false;
  @Input() absolutePosition:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right' = 'top-right';
  @Input() isDot = false;

  get variantClass() {
    return `badge--${this.variant}`;
  }

  @ContentChild('badgeContent') content!: ElementRef;

  @HostBinding('class') get positionIfAbsolute() {
    if (this.isAbsolute) {
      const pos = `badge--absolute-${this.absolutePosition}`;
      return this.isDot ? `${pos}--dot` : pos;
    }
    return null;
  }

  get withBorder() {
    return this.isAbsolute ? 'badge--border' : '';
  }

  get dotClass() {
    return this.isDot ? 'badge--dot' : '';
  }
}
