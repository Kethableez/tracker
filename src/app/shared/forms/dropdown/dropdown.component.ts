import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Injector, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AbstractInput } from '../directives/abstract-input.directive';
import { TablerIconsModule } from 'angular-tabler-icons';
import { expandCollapse } from '../../animations/expand-collapse.animation';
import { chevronRotate } from '../../animations/chevron-rotate.animation';
import { InputErrorComponent } from '../input-error/input-error.component';

@Pipe({
	name: 'dropdownLabel',
	standalone: true
})
export class DropdownLabelPipe<T> implements PipeTransform {
	transform(option: T, labelKey?: string): any {
		if (labelKey && option[labelKey as keyof T]) {
			return option[labelKey as keyof T];
		}
		return option;
	}
}

@Component({
	selector: 'ktbz-dropdown',
	templateUrl: 'dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, ReactiveFormsModule, TablerIconsModule, DropdownLabelPipe, InputErrorComponent],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: DropdownComponent,
			multi: true
		}
	],
	animations: [expandCollapse, chevronRotate]
})
export class DropdownComponent<T> extends AbstractInput<T | T[keyof T] | (T | T[keyof T])[] | null> implements OnInit {
	@Input() type: 'single' | 'multi' = 'single';
	@Input() options!: T[];
	@Input() optionLabel!: string;
	@Input() optionValue!: string;
	@Input() filter = false;

	public value: T | T[keyof T] | (T | T[keyof T])[] | null = null;
	public state: 'opened' | 'closed' = 'closed';
	public searchValue = null;

	get isFilterVisible() {
		if (!this.options.length) {
			return false;
		} else {
			if (typeof this.options[0] === 'string') {
				return this.filter;
			} else return this.filter && this.optionLabel;
		}
	}

	get controlValueChips(): (T | T[keyof T])[] {
		if (this.controlValue && (this.controlValue as (T | T[keyof T])[]).length) {
			return this.controlValue as (T | T[keyof T])[];
		} else return [];
	}
	constructor(
		protected override readonly injector: Injector,
		protected override readonly elRef: ElementRef
	) {
		super(injector, elRef);
	}

	override doOnInit(): void {}

	override doOnFocusFn(): void {}

	override doOnBlurFn(): void {
		this.toggleDropdown('closed');
	}

	public toggleDropdown(state?: 'closed' | 'opened') {
		console.log(state);
		if (this.forDisplay) return;
		if (state) {
			this.state = state;
			return;
		}
		this.state = this.state === 'closed' ? 'opened' : 'closed';
	}

	public selectOption(option: T | any): void {
		console.log(option);
		if (this.type === 'single') {
			this.selectSingleOption(option);
		} else {
			this.selectMultiOption(option);
		}

		this.doUpdate();
		this.formControl.updateValueAndValidity();
	}

	public clearSearch() {
		this.searchValue = null;
	}

	get parsedValue() {
		if (this.controlValue && this.optionValue) {
			return this.options.find((option) => option[this.optionValue as keyof T] === this.controlValue);
		}
		return this.controlValue;
	}

	public isOptionSelected(option: T) {
		if (this.type === 'single') {
			return this.parsedValue === option;
		} else {
			return this.controlValue ? (this.controlValue as (T | T[keyof T])[]).includes(this.transform(option, this.optionLabel)) : false;
		}
	}

	private selectSingleOption(option: T) {
		this.writeValue(this.transform(option, this.optionValue));
		this.toggleDropdown('closed');
	}

	private selectMultiOption(option: T) {
		const selectedOptions = this.controlValue as (T | T[keyof T])[];

		if (!selectedOptions) {
			this.writeValue([this.transform(option, this.optionValue)]);
			return;
		}

		const newOptions = selectedOptions.includes(this.transform(option, this.optionValue))
			? selectedOptions.filter((values) => values !== this.transform(option, this.optionValue))
			: [...selectedOptions, this.transform(option, this.optionValue)];
		if (!newOptions.length) {
			this.writeValue(null);
			return;
		}

		this.writeValue(newOptions);
	}

	private transform(option: T, valueKey?: string): T[keyof T] | T {
		if (valueKey && option[valueKey as keyof T]) {
			return option[valueKey as keyof T];
		}
		return option;
	}
}
