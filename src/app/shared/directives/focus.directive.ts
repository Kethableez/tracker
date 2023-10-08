import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({ selector: '[ktbzFocus]', standalone: true })
export class FocusDirective {
  @Output() onFocusIn = new EventEmitter<void>();
  @Output() onFocusOut = new EventEmitter<void>();

  @HostListener('document:click', ['$event'])
  private onClick(event: any): void {
    const path = event.path || event.composedPath();
    const inPath = path.find((e: any) => e === this.elRef.nativeElement);

    if (!!inPath) {
      this.onFocusIn.emit();
    } else {
      this.onFocusOut.emit();
    }
  }

  constructor(private elRef: ElementRef) {}
}
