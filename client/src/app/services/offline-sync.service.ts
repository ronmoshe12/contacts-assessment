import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { Contact } from '../contacts/contact.model';
import { ContactService } from '../contacts/contact.service';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OfflineSyncService {
  private db: IDBPDatabase | undefined;

  constructor(private contactService: ContactService) {
    this.initializeDatabase();
    this.registerSyncHandler();
  }

  private async initializeDatabase() {
    this.db = await openDB('contacts-db', 1, {
      upgrade(db) {
        db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
        db.createObjectStore('deletedContacts', { keyPath: 'id' });
        db.createObjectStore('updatedContacts', { keyPath: 'id' });
      }
    });
  }

  async saveContactOffline(contact: Contact) {
    if (!contact.id) {
      contact.id = Date.now();
    }
    await this.db?.put('contacts', contact);
  }

  async saveContactsOffline(contacts: Contact[]) {
    const tx = this.db?.transaction('contacts', 'readwrite');
    const store = tx?.objectStore('contacts');
    for (const contact of contacts) {
      if (!contact.id) {
        contact.id = Date.now(); // Assign a unique ID if not present
      }
      await store?.put(contact);
    }
    await tx?.done;
  }

  async getContactsOffline(): Promise<Contact[]> {
    return await this.db?.getAll('contacts') || [];
  }

  async getContactByIdOffline(id: number): Promise<Contact | undefined> {
    return await this.db?.get('contacts', id);
  }

  async updateContactOffline(contact: Contact) {
    await this.db?.put('updatedContacts', contact);
  }

  async deleteContactOffline(id: number) {
    await this.db?.put('deletedContacts', { id });
  }

  async syncContacts() {
    await this.syncCreatedContacts();
    await this.syncUpdatedContacts();
    await this.syncDeletedContacts();
  }

  async syncCreatedContacts() {
    const contacts = await this.db?.getAll('contacts');
    if (contacts && contacts.length > 0) {
      for (const contact of contacts) {
        try {
          const addedContact = await this.contactService.addContact(contact).toPromise();
          console.log('Contact added:', addedContact);
          await this.db?.delete('contacts', contact.id);
        } catch (error) {
          console.error('Error syncing contact:', contact, error);
        }
      }
    }
  }

  async syncUpdatedContacts() {
    const contacts = await this.db?.getAll('updatedContacts');
    for (const contact of contacts || []) {
      this.contactService.updateContact(contact.id, contact).subscribe(() => {
        this.db?.delete('updatedContacts', contact.id);
      });
    }
  }

  async syncDeletedContacts() {
    const deletedContacts = await this.db?.getAll('deletedContacts');
    for (const contact of deletedContacts || []) {
      this.contactService.deleteContact(contact.id).subscribe(() => {
        this.db?.delete('deletedContacts', contact.id);
      });
    }
  }

  registerSyncHandler() {
    fromEvent(window, 'online').subscribe(() => {
      this.syncContacts();
    });
  }
}
