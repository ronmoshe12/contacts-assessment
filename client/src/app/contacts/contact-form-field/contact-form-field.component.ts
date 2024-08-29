import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FORM_ERROR_MESSAGES } from '../../constants/form-error-messages';

@Component({
  selector: 'app-contact-form-field',
  templateUrl: './contact-form-field.component.html',
  styleUrls: ['./contact-form-field.component.scss']
})
export class ContactFormFieldComponent {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() isEditMode: boolean = false;

  shouldShowError(): boolean {
    const control = this.formGroup.get(this.controlName);
    return !!control?.invalid && !!control?.touched && this.isEditMode;
  }

  getErrorMessages(): string[] {
    const control = this.formGroup.get(this.controlName);
    if (!control || !control.errors) {
      return [];
    }

    const errorMessages: string[] = [];

    if (control.errors['required']) {
      errorMessages.push(FORM_ERROR_MESSAGES.required);
    }
    if (control.errors['maxlength']) {
      errorMessages.push(FORM_ERROR_MESSAGES.maxlength);
    }
    if (control.errors['numeric']) {
      errorMessages.push(FORM_ERROR_MESSAGES.numeric);
    }
    if (control.errors['email']) {
      errorMessages.push(FORM_ERROR_MESSAGES.email);
    }
    if (control.errors['phone']) {
      errorMessages.push(FORM_ERROR_MESSAGES.phone);
    }

    return errorMessages;
  }
}
