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

  public process: Process[];
  public processlistView: Process[];
  public url: string;
  tuListaDeDatos: any[] = []; // Lista filtrada de datos
  constructor(
    private _processService: ProcessService
  ){
    this.process = [];
    this.processlistView = []
    this.url = Global.url;  
  }

  ngOnInit(): void {
    this.getProcess();
    
  }

  getProcess(){
    this._processService.getProcess().subscribe(
      Response => {
        if(Response.process){
          this.process = Response.process;
          this.processlistView = this.process;
        }
        console.log(Response.process[0].id);
        console.log('soy process', this.process);
        console.log(this.process[0].anio_proceso)

      },
      error =>{
        console.log(<any>error)
      }
    );
    
  }
  
  obtenerAnios(): number[] {
    const anios = this.process.map(item => item.anio_proceso);
    return [...new Set(anios)];
  }


  filtrarPorAnio(event: Event) {
    const anioSeleccionado = (event.target as HTMLSelectElement).value;
    if (!anioSeleccionado) {
      this.processlistView = [...this.process];
    } else {
      this.processlistView = this.process.filter(item => item.anio_proceso.toString() === anioSeleccionado);
    }
    
  }


  editarItem(item: any) {
    // Lógica para editar el elemento
    console.log('Editar:', item);
    // Puedes abrir un formulario de edición o realizar alguna acción de edición
  }

  eliminarItem(item: any) {
    if (item !== null) {
      this._processService.deleteProcess(item.id).subscribe(
        Response => {
          console.log('Eliminar:', item);
          this.getProcess()
        },
        error =>{
          console.log(<any>error)
        }
      );
    }
  }

  showModal = true;

  mostrarModal() {
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
  }

}
