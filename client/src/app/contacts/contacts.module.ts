import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactItemComponent } from './contact-item/contact-item.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ContactFormFieldComponent } from './contact-form-field/contact-form-field.component';



@NgModule({
  declarations: [
    ContactListComponent,
    ContactItemComponent,
    ContactDetailComponent,
    ContactFormFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ContactsModule { }
