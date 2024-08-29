import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent  {
  @Input() contact!: Contact;

  constructor(private router: Router) {}


  onSelectContact(): void {
    this.router.navigate(['/contacts', this.contact.id]);
  }
}
