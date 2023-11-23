import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
  ) {
    this.checkPermissions();
  }

  private async checkPermissions() {

    if(!this.platform.is('desktop')){
      const permission = await Geolocation.checkPermissions();
      if (permission.location === 'prompt') {
        await Geolocation.requestPermissions();
      }
    }
    
  }
}
