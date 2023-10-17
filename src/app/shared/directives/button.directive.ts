import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
	selector: '[ktbzBtn]',
	standalone: true
})
export class ButtonDirective {
	@Input() variant: string = 'solid';
	@Input() size: 'small' | 'medium' | 'large' = 'medium';

	@Input() onlyIcon = false;

	@HostBinding('class')
	baseClass = 'btn';

	@HostBinding('class.solid') get solidClass() {
		return this.variant === 'solid';
	}

	@HostBinding('class.outline') get outlineClass() {
		return this.variant === 'outline';
	}

	@HostBinding('class.filled') get filledClass() {
		return this.variant === 'filled';
	}

	@HostBinding('class.ghost') get ghostClass() {
		return this.variant === 'ghost';
	}

	@HostBinding('class.neutral') get neutralClass() {
		return this.variant === 'neutral';
	}

	@HostBinding('class.small') get smallClass() {
		return this.size === 'small';
	}

	@HostBinding('class.medium') get mediumClass() {
		return this.size === 'medium';
	}

	@HostBinding('class.large') get largeClass() {
		return this.size === 'large';
	}

	@HostBinding('class.icon') get iconClass() {
		return this.onlyIcon;
	}
}
