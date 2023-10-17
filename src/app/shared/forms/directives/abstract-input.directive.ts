import { Directive, HostListener, Input } from '@angular/core';
import { AbstractInputBase } from './abstract-input-base.directive';

@Directive()
export abstract class AbstractInput<T> extends AbstractInputBase<T> {
	@Input() placeholder: string = '';
	@Input() helper!: string;
	@Input() icon!: string;

	@HostListener('focusin')
	onFocusIn() {
		this.isFocused = true;
	}

	@HostListener('focusout')
	onFocusOut() {
		this.isFocused = false;
	}
}
