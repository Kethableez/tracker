import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormService {
	constructor() {}

	markAsDirtyAndTouched(form: FormGroup) {
		form.markAllAsTouched();
		for (const control in form.controls) {
			form.controls[control].markAsDirty();
		}

		form.updateValueAndValidity({ emitEvent: true });
	}

	reset(form: FormGroup, toSet?: object) {
		form.reset(toSet);
		for (const control in form.controls) {
			form.controls[control].markAsPristine();
			form.controls[control].markAsUntouched();
		}

		form.updateValueAndValidity({ emitEvent: true });
	}
}
