import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.checkPermissions();
  }

  private async checkPermissions() {
    const permission = await Geolocation.checkPermissions();
    if (permission.location === 'prompt') {
      await Geolocation.requestPermissions();
    }
  }
}
