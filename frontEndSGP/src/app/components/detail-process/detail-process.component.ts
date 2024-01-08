import { Component, Input, OnInit } from '@angular/core';
import { Process } from 'src/app/models/process';

@Component({
  selector: 'app-detail-process',
  templateUrl: './detail-process.component.html',
  styleUrls: ['./detail-process.component.css']
})
export class DetailProcessComponent implements OnInit {

  public activePanel: string;
  public filas: any;
  public mostrarHome: boolean;
  public title: String;
  public datein: String;
  public tableData: any[] = [];
  public tableConfig: any;
  public year: String;
  
  
  @Input() procesoSeleccionado: any;

  constructor(){
    this.activePanel = '';
    this. filas = [];
    this.mostrarHome = false;
    this.title = '';
    this.datein = '';
    this.year = ''
  }
  ngOnInit(): void {
    this.title = this.procesoSeleccionado.nombre_proceso;
    this.datein = this.procesoSeleccionado.fecha_inicio;
    this.year = this.procesoSeleccionado.anio_proceso;
  }

  
  RegresarProceso() {
    this.mostrarHome = true; // Mostrar DetailProcessComponent al seleccionar un proceso
  }
  agregarFila() {
    const nuevaFila = {
      numero: '1',
      elemento: 'Elemento 1',
      etapa: 'Notificacion acto administrativo de inicio de sanción',
      fecha_notificacion: '27/01/2011',
      check:'true'
    };
    this.tableData.push(nuevaFila);
  }

  setActivePanel(panelName: string) {
    this.activePanel = panelName;
  }


}
