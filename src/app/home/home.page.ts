import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, 
  IonLabel, IonBadge, IonSelect, IonSelectOption, IonInput, 
  IonButton, IonButtons, IonModal, IonIcon, ToastController, AlertController 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  medkitOutline, calendarOutline, locationOutline, businessOutline, 
  funnelOutline, refreshOutline, timeOutline, checkmarkCircleOutline, 
  closeOutline, personOutline 
} from 'ionicons/icons';
import { CitasService, Especialista } from '../services/citas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem,
    IonLabel, IonBadge, IonSelect, IonSelectOption, IonInput,
    IonButton, IonButtons, IonModal, IonIcon
  ]
})
export class HomePage implements OnInit {
  listaOriginal: Especialista[] = [];
  listaFiltrada: Especialista[] = [];

  ciudades: string[] = [];
  companias: string[] = [];

  ciudadFiltro: string = '';
  companiaFiltro: string = '';

  totalEspecialistas: number = 0;
  totalDisponibles: number = 0;

  modalAbierto: boolean = false;
  seleccionado: Especialista | null = null;
  fechaCita: string = '';
  horaCita: string = '';

  constructor(
    private citasService: CitasService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    addIcons({
      medkitOutline, calendarOutline, locationOutline, businessOutline,
      funnelOutline, refreshOutline, timeOutline, checkmarkCircleOutline,
      closeOutline, personOutline
    });
  }

  ngOnInit() {
    this.citasService.getEspecialistas().subscribe(res => {
      this.listaOriginal = res;
      
      this.ciudades = [...new Set(res.map(e => e.ciudad))];
      this.companias = [...new Set(res.map(e => e.compania))];

      this.filtrarYOrdenar();
    });
  }

  filtrarYOrdenar() {
    let temporal = this.listaOriginal.filter(item => {
      const pasaCiudad = !this.ciudadFiltro || item.ciudad === this.ciudadFiltro;
      const pasaCompania = !this.companiaFiltro || item.compania === this.companiaFiltro;
      return pasaCiudad && pasaCompania;
    });

    this.listaFiltrada = temporal.sort((a, b) => 
      a.apellido.localeCompare(b.apellido, 'es', { sensitivity: 'base' })
    );

    this.totalEspecialistas = this.listaFiltrada.length;
    this.totalDisponibles = this.listaFiltrada.filter(e => e.disponible).length;
  }

  limpiar() {
    this.ciudadFiltro = '';
    this.companiaFiltro = '';
    this.filtrarYOrdenar();
  }

  async abrirModal(item: Especialista) {
    if (!item.disponible) {
      const toast = await this.toastCtrl.create({
        message: 'El especialista seleccionado no cuenta con agenda disponible.',
        duration: 2500,
        color: 'warning',
        position: 'bottom'
      });
      await toast.present();
      return;
    }

    this.seleccionado = item;
    this.fechaCita = '';
    this.horaCita = '';
    this.modalAbierto = true;
  }

  setModal(estado: boolean) {
    this.modalAbierto = estado;
  }

  async ejecutarAccionReserva() {
    if (!this.fechaCita || !this.horaCita) {
      const toastError = await this.toastCtrl.create({
        message: 'Por favor complete la fecha y la hora de la cita.',
        duration: 2500,
        color: 'danger',
        position: 'bottom'
      });
      await toastError.present();
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Confirmación de Reserva',
      subHeader: `Especialista: ${this.seleccionado?.nombreCompleto}`,
      message: `¿Desea agendar la cita en ${this.seleccionado?.ciudad} con ${this.seleccionado?.compania} para el día ${this.fechaCita} a las ${this.horaCita}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => this.finalizarReserva()
        }
      ]
    });

    await alert.present();
  }

  async finalizarReserva() {
    this.modalAbierto = false;

    const toastSuccess = await this.toastCtrl.create({
      message: 'Cita médica agendada exitosamente.',
      duration: 2500,
      color: 'success',
      position: 'bottom'
    });
    
    await toastSuccess.present();
  }
}