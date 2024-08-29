import { Component } from '@angular/core';
import { WebServiceWorker } from './services/web-service-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private webServiceWorker: WebServiceWorker) {
    this.webServiceWorker.$isAnyNewUpdateAvailable.subscribe(isAvailable => {
      if (isAvailable) {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      }
    });
  }
}
