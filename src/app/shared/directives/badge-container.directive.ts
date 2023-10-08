import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[ktbzBadgeContainer]',
  standalone: true,
})
export class BadgeContainerDirective {
  @HostBinding('style.position') containerPosition = 'relative';
}
