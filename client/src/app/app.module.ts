import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ContactsModule} from "./contacts/contacts.module";
import {HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor} from "@angular/common/http";
import {ServiceWorkerModule} from "@angular/service-worker";
import {environment} from "../environments/environment";
import { LoaderComponent } from './components/shared/loader/loader.component';
import {HttpRequestInterceptor} from "./interceptors/http.interceptor";
import {LoaderService} from "./services/loader.service";



@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContactsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.serviceWorkerEnabled,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
