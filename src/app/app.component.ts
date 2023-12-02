import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { App } from '@capacitor/app';

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
    App.getLaunchUrl().then(resp => {
      console.log(resp.url)
    })
    .catch(err => console.log(err))
  }

  private async checkPermissions() {

    if(this.platform.is('hybrid')){
      const permission = await Geolocation.checkPermissions();
      if (permission.location === 'prompt') {
        await Geolocation.requestPermissions();
      }
    }
    
  }
}
