import { Component, OnInit, computed, inject } from '@angular/core';
import { Credito } from 'src/app/models';
import { CreditoService } from 'src/app/services/credito.service';
import { PagosService } from 'src/app/services/pagos.service';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { UtilsService } from '../../../services/utils.service';
import { CrearPago } from 'src/app/helpers/crearPago';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage {

  utilsSvc = inject(UtilsService);
  pagoService = inject(PagosService);
  creditoService = inject(CreditoService);
  comunicacionService = inject(NotificacionesService);

  public tipeOfPago = "fijo";
  public credito = computed(() => this.creditoService.currentCredit());

  constructor() { }

  ionViewWillLeave() {
    this.creditoService.removeCurrentCredit();
  }

  ionViewWillEnter() {}

  async pagar(valor: number) {

    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.pagoService.addPago(new CrearPago(this.credito(), valor))
      .subscribe({
        next: async ({ message }) => {
          this.comunicacionService.notificarPagoExitoso();
          await loading.dismiss();
          this.showConfirmSendMessage(message);
        },
        error: async (err) => {

          await loading.dismiss();

          let mensaje: string = "Ocurrio un problema con el servidor, hable con el administrador";

          this.utilsSvc.presentAlert({
            header: 'Error al procesar el pago',
            mode: 'ios',
            message: mensaje,
            buttons: ['Ok']
          })
        }
      })

  }

  public goToEditClient() {
    this.utilsSvc.routerLink(`/main/cliente/${this.credito().cliente._id}`);
  }

  public changeTipeOfPago(ev: any) {
    this.tipeOfPago = ev.detail.value;
  }

  private async showConfirmSendMessage(message: string) {

    await this.utilsSvc.presentAlert({
      header: 'Confirmacion',
      message: 'Desea enviar comprobante',
      buttons: [
        {
          text: 'Si, Enviar',
          handler: async () => {
            await this.utilsSvc.share({
              title: 'Pago exitoso',
              text: message
            })
            this.utilsSvc.routerLink('/main/rutero')
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.utilsSvc.routerLink("/main/rutero")
          }
        }
      ]
    })

  }

}
