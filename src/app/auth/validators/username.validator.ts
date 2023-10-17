import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

export class UsernameValidator {
  static create(
    authService: AuthService,
    cdr: ChangeDetectorRef
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return authService
        .usernameAvailibility(control.value)
        .pipe(
          map((response) => {
              return response.available ? null : { taken: true };
            }
          ),
          finalize(() => cdr.markForCheck())
        );
    };
  }
}
