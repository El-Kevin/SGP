import { Component, Input, OnInit } from '@angular/core';
import { DetailProcess } from 'src/app/models/detailProcessModel';
import { ProcessService } from 'src/app/services/process.service'; 
import { Global } from 'src/app/services/global';
@Component({
  selector: 'app-detail-process',
  templateUrl: './detail-process.component.html',
  styleUrls: ['./detail-process.component.css'],
  providers: [ProcessService]
})
export class DetailProcessComponent implements OnInit {

  /**/
  public url: string;
  public title: String;
  public datein: String;
  public year: String;
  public showModal = false;
  public newDetail_Process: DetailProcess;
  public title_Model: String;
  /* */

  public activePanel: string;
  public filas: any;
  public mostrarHome: boolean;
  public tableData: any[] = [];
  public tableConfig: any;

  
  
  @Input() procesoSeleccionado: any;

  constructor(
    private _processService: ProcessService
  ){
    this.url = Global.url;  
    this.title = '';
    this.datein = '';
    this.year = '';
    this.title_Model = 'Agregar';
    this.newDetail_Process = new DetailProcess(
      0,
      '',
      'Informe técnico de incumplimiento',
      false,
      undefined,
      undefined
    );

    this.activePanel = '';
    this. filas = [];
    this.mostrarHome = false;
    
  }
  ngOnInit(): void {
    this.getDetailProcess()
    /* */
    this.title = this.procesoSeleccionado.process_name;
    this.datein = this.procesoSeleccionado.start_date;
    this.year = this.procesoSeleccionado.process_year;

    /* */

    
  }
  deleteItem(item: any){
   console.log(item.id_detail )
    if(item !== null){
      this._processService.deteleDetailProcess(item.id_detail).subscribe(
        Response => {
          this.getDetailProcess();
        },
        error =>{
          console.log(<any>error)
        }
      );
    }

  }
  getDetailProcess(){
    this._processService.getDetailProcess(parseInt(this.procesoSeleccionado.id_process)).subscribe(
      Response => {
        this.tableData = Response.detailProcesses
        console.log(Response)
      },
      error =>{
        console.log(<any>error)
      }
    );
  }

  mostrarModal() {
    this.showModal = true;
  }
  RegresarProceso() {
    this.mostrarHome = true; // Mostrar DetailProcessComponent al seleccionar un proceso
  }
  onSubmit(form: any){
    if (this.title_Model == 'Editar'){
      this.newDetail_Process.process_id = parseInt(this.procesoSeleccionado.id_process); 
      console.log(this.newDetail_Process) 

      this._processService.deteleDetailProcess(this.newDetail_Process).subscribe(
        Response =>{
          form.reset()
          this.cerrarModal();
          this.getDetailProcess();
        },
        err => {
          console.log(<any> err)
        }
      )
    }else{
    this.newDetail_Process.process_id = parseInt(this.procesoSeleccionado.id_process);
     // Obtener la fecha actual
     let today = new Date();
     // Sumar 8 días a la fecha actual
     let futureDate = new Date(today.setDate(today.getDate() + 8));
     this.newDetail_Process.notification_date = futureDate;
    console.log(this.newDetail_Process)
    this._processService.createDetailProcess(this.newDetail_Process).subscribe(
      Response =>{
        form.reset()
        this.cerrarModal();
        this.getDetailProcess();
      },
      err => {
        console.log(<any> err)
      }
    )
  }
    
  }
  cerrarModal(){
    this.showModal = false;
  }

  

  setActivePanel(panelName: string) {
    this.activePanel = panelName;
  }

  editarItem(item: DetailProcess) {
    this.title_Model = 'Editar';
    this.showModal = true;
    this.newDetail_Process = item;
  }

}
