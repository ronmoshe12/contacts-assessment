import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import {ROUTE_PATHS} from "./constants/route-constants";

const routes: Routes = [
  { path: ROUTE_PATHS.CONTACTS, component: ContactListComponent },
  { path: `${ROUTE_PATHS.CONTACTS}/${ROUTE_PATHS.NEW}`, component: ContactDetailComponent },
  { path: `${ROUTE_PATHS.CONTACTS}/:id`, component: ContactDetailComponent },
  { path: '', redirectTo: `/${ROUTE_PATHS.CONTACTS}`, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
