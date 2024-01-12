import { Component, OnInit } from '@angular/core';
import { Process } from 'src/app/models/process';
import { ProcessService } from 'src/app/services/process.service'; 
import { Global } from 'src/app/services/global';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProcessService]
})


export class HomeComponent implements OnInit {
  public newProcess: Process;
  public process: Process[];
  public processlistView: Process[];
  public title_Model: String;
  public url: string;
  public showModal = false;
  
  mostrarDetailProcess: boolean = false;
  procesoSeleccionado: any = null; // Asegúrate de tener una variable para el proceso seleccionado

  seleccionarProceso(item: any) {
    this.procesoSeleccionado = item;
    this.mostrarDetailProcess = true; // Mostrar DetailProcessComponent al seleccionar un proceso
  }
  constructor(
    private _processService: ProcessService
  ){
    this.title_Model = '';
    this.process = [];
    this.processlistView = []
    this.url = Global.url;  
    this.newProcess = new Process(
                                    '',
                                    '',
                                    new Date(new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').reverse().join('-')),
                                    new Date().getFullYear(),
                                    'En proceso',
                                    undefined,
                                    undefined
    );
  };

  restarVariable(){
    this.newProcess = new Process(
      '',
      '',
      new Date(new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
    .split('/').reverse().join('-')),
      new Date().getFullYear(),
      'En proceso',
      undefined,
      undefined,
    );
  }

  ngOnInit(): void {
    this.getProcess();
  }

  getProcess(){
    this._processService.getProcess().subscribe(
      Response => {
        if(Response.processes){
          this.process = Response.processes;
          
          this.processlistView = this.process;
          
        }
      },
      error =>{
        console.log(<any>error)
      }
    );
  }
  
  getYears(): number[] {
    const anios = this.process.map(item => item.process_year);
    return [...new Set(anios)];
  }

  filterForYear(event: Event) {
    const anioSeleccionado = (event.target as HTMLSelectElement).value;
    if (!anioSeleccionado) {
      this.processlistView = [...this.process];
    } else {
      this.processlistView = this.process.filter(item => item.process_year.toString() === anioSeleccionado);
    }
  }

  editarItem(item: Process) {
    this.title_Model = 'Editar';
    this.showModal = true;
    this.newProcess = item;
  }

  onSubmit(form: any){
    const id_user = localStorage.getItem('id_user'); // Obteniendo id_user del localStorage
    if (id_user) {
      if (this.title_Model == 'Editar') {
        this.newProcess.process_name = form.value.nombre_proceso;
        this.newProcess.start_date = form.value.fecha_inicio;
        this.newProcess.process_year = form.value.anio_proceso;
        this.newProcess.user_table_id = parseInt(id_user); // Asignando id_user a user_table_id
  
        this._processService.updateProcess(this.newProcess).subscribe(
          Response => {
            this.getProcess();
            form.reset();
            this.cerrarModal();
          },
          err => {
            console.log(<any>err);
          }
        );
      } else {
        this.newProcess.process_name = form.value.nombre_proceso;
        this.newProcess.start_date = form.value.fecha_inicio;
        this.newProcess.process_year = form.value.anio_proceso;
        this.newProcess.user_table_id = parseInt(id_user); // Asignando id_user a user_table_id
  
        this._processService.saveProcess(this.newProcess).subscribe(
          Response => {
            form.reset();
            this.cerrarModal();
            this.getProcess();
          },
          err => {
            console.log(<any>err);
          }
        );
      }
    } else {
      console.log('El id_user no está disponible en el localStorage');
      // Puedes manejar aquí la lógica si id_user no está disponible en el localStorage
    }
  }
  

  eliminarItem(item: any) {
    console.log(item)
    if (item !== null) {
      this._processService.deleteProcess(item.id_process).subscribe(
        Response => {
          console.log(Response);
          this.getProcess()
        },
        error =>{
          console.log(<any>error)
        }
      );
    }
  }

  mostrarModal() {
    this.title_Model = 'Crear Proceso';
    this.showModal = true;
    this.restarVariable();
  }

  cerrarModal() {
    this.showModal = false;
    this.getProcess()
  }

  
}
