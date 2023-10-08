import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[ktbzActionBtn]',
  standalone: true,
})
export class ActionButtonDirective {
  @Input() inverted = false;

  @HostBinding('class')
  baseClass = 'action-btn';

  @HostBinding('class.inverted') get isInverted() {
    return this.inverted;
  }
}
