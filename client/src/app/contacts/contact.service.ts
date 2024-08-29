import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, from, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contact } from './contact.model';
import { OfflineSyncService } from '../services/offline-sync.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private offlineSyncService: OfflineSyncService) {}

  getContacts(): Observable<Contact[]> {
    if (navigator.onLine) {
      return this.http.get<{ contacts: Contact[] }>(this.apiUrl).pipe(
        map(response => {
          this.offlineSyncService.saveContactsOffline(response.contacts); // Update offline storage with the list of contacts
          return response.contacts;
        })
      );
    } else {
      return from(this.offlineSyncService.getContactsOffline());
    }
  }

  getContactById(id: number): Observable<Contact> {
    if (navigator.onLine) {
      return this.http.get<{ contact: Contact }>(`${this.apiUrl}/${id}`).pipe(
        map(response => response.contact)
      );
    } else {
      return from(this.offlineSyncService.getContactByIdOffline(id)).pipe(
        map(contact => {
          if (!contact) {
            throw new Error('Contact not found');
          }
          return contact;
        })
      );
    }
  }

  addContact(contact: Contact): Observable<Contact> {
    if (navigator.onLine) {
      return this.http.post<Contact>(this.apiUrl, contact);
    } else {
      this.offlineSyncService.saveContactOffline(contact);
      return of(contact);
    }
  }

  updateContact(id: number, contact: Contact): Observable<void> {
    if (navigator.onLine) {
      return this.http.put<void>(`${this.apiUrl}/${id}`, contact);
    } else {
      this.offlineSyncService.updateContactOffline(contact);
      return of(undefined);
    }
  }

  deleteContact(id: number): Observable<void> {
    if (navigator.onLine) {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    } else {
      this.offlineSyncService.deleteContactOffline(id);
      return of(undefined);
    }
  }

  generateContacts(): Observable<{ message: string, contactsAdded: number }> {
    return this.http.post<{ message: string, contactsAdded: number }>(`${this.apiUrl}/generate`, {});
  }
}
