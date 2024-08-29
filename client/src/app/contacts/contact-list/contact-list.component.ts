import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import {ROUTE_PATHS} from "../../constants/route-constants";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  onAddNewContact(): void {
    this.router.navigate([`/${ROUTE_PATHS.CONTACTS}/${ROUTE_PATHS.NEW}`]);
  }

  onAddRandomRecords(): void {
    this.contactService.generateContacts().subscribe(response => {
      console.log(response.message);
      this.ngOnInit();  // Reload the contact list after generating new contacts
    });
  }
}
