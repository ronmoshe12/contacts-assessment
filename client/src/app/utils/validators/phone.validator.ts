import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const isValid = /^[+]?(\d{1,3})?[-\s]?(\d{1,4})[-\s]?(\d{1,4})[-\s]?(\d{1,9})$/.test(value);
  return isValid ? null : { phone: true };
}
