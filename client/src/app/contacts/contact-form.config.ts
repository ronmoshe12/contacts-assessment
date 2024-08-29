import {Validators} from '@angular/forms';
import {phoneValidator} from "../utils/validators/phone.validator";

export const CONTACT_FORM_CONFIG = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    validators: [Validators.required],
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    validators: [Validators.required, Validators.email],
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    validators: [
      phoneValidator
    ],
  },
  {
    name: 'cell',
    label: 'Cell',
    type: 'text',
    validators: [
      phoneValidator
    ],
  },
  {
    name: 'address',
    label: 'Full Address',
    type: 'text',
    validators: [],
  },
  {
    name: 'registrationDate',
    label: 'Registration Date',
    type: 'date',
    validators: [],
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    validators: [Validators.min(0)],
  },
  {
    name: 'image',
    label: 'Image URL',
    type: 'text',
    validators: [],
  },
];
