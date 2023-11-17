import { Injectable} from "@angular/core";
//Va a permitir hacer peticiones ajax a un servicio externo y modificar las cabeceras de esas peticiones
import { HttpClient, HttpHeaders } from "@angular/common/http";
//Recpger la informacion que devuelve el apirest
import { Observable } from "rxjs";
import { Process } from '../models/process';
import { Global } from "./global";
@Injectable()
export class ProcessService{
    public url: String;
    constructor(
        public _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando el servicio de angular'
    }
    getProcess(): Observable<any>{
        let header = new HttpHeaders().set('Content-type','application/json' );
        return this._http.get(this.url+'getProcess', {headers: header});

    }

    deleteProcess(id: any): Observable<any>{
        let header = new HttpHeaders().set('Content-type','application/json');
        return this._http.delete(this.url+'deleteProcess/'+id, {headers:header});
    }
}