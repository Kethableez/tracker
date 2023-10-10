import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ButtonDirective } from '../directives/button.directive';
import { NotificationService } from './notification.service';
import { slideInOutX } from '../animations/slide-in-out.animation';

@Component({
  selector: 'ktbz-notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TablerIconsModule, ButtonDirective],
  animations: [slideInOutX],
  host: { '[@slideInOutX]': 'in' },
})
export class NotificationComponent implements OnInit {
  @Input() header?: string;
  @Input() message?: string;
  @Input() type: 'error' | 'success' | 'warning' | 'info' = 'info';
  @Input() withAction = true;
  @Input() closable = true;

  @Output() onAction = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  iconsMap: { [key: string]: string } = {
    success: 'circle-check-filled',
    error: 'alert-octagon-filled',
    info: 'alert-circle-filled',
    warning: 'alert-triangle-filled',
  };

  constructor(
    private notificationService: NotificationService,
    public ref: ElementRef
  ) {}

  ngOnInit() {}

  close() {
    this.notificationService.removeSelf(this.ref);
  }

  toggleAction() {
    this.onAction.emit();
  }
}
