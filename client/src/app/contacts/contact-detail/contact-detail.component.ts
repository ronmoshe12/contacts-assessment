import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { CONTACT_FORM_CONFIG } from '../contact-form.config';
import {ROUTE_PATHS} from "../../constants/route-constants";
import {Location} from "@angular/common";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  contactForm: FormGroup;
  contact: Contact | undefined;
  isEditMode: boolean = false;
  isNewContact: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private location: Location,
  ) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (this.route.snapshot.url[1]?.path === ROUTE_PATHS.NEW) {
      this.isNewContact = true;
      this.isEditMode = true;
    } else if (contactId) {
      this.contactService.getContactById(+contactId).subscribe(contact => {
        this.contact = contact;
        if (this.contact) {
          this.contactForm.patchValue(this.contact);
        }
      });
    }
  }

  createFormGroup(): FormGroup {
    const group: any = {};

    CONTACT_FORM_CONFIG.forEach(field => {
      group[field.name] = this.fb.control('', field.validators);
    });

    return this.fb.group(group);
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  onSave(): void {
    if (this.contactForm.valid) {
      const contactData = this.contactForm.value;
      if (this.isNewContact) {
        this.contactService.addContact(contactData).subscribe(() => {
          this.router.navigate(['/contacts']);
        });
      } else {
        this.contactService.updateContact(this.contact!.id, contactData).subscribe(() => {
          this.router.navigate(['/contacts']);
        });
      }
    }
  }

  getFieldLabel(fieldName: string): string {
    const field = CONTACT_FORM_CONFIG.find(f => f.name === fieldName);
    return field ? field.label : '';
  }

  getFieldType(fieldName: string): string {
    const field = CONTACT_FORM_CONFIG.find(f => f.name === fieldName);
    return field ? field.type : 'text';
  }


  onDelete(): void {
    if (this.contact) {
      this.contactService.deleteContact(this.contact.id).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
