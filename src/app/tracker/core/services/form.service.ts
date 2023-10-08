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

    form.updateValueAndValidity();
  }
}
