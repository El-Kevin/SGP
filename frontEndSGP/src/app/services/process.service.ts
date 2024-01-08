import { Injectable} from "@angular/core";
//Va a permitir hacer peticiones ajax a un servicio externo y modificar las cabeceras de esas peticiones
import { HttpClient, HttpHeaders } from "@angular/common/http";
//Recpger la informacion que devuelve el apirest
import { Observable } from "rxjs";
import { Process } from '../models/process';
import { Global } from "./global";
import { User } from 'src/app/models/user';
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
    getProcess(): Observable<any> {
        const token = localStorage.getItem('token'); // Obtener el token del localStorage
        if (token) {
          const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          return this._http.get(this.url + 'getProcess', { headers: header });
        } else {
          return new Observable(); 
        }
      }

    deleteProcess(id: any): Observable<any>{
        let header = new HttpHeaders().set('Content-type','application/json');
        return this._http.delete(this.url+'deleteProcess/'+id, {headers:header});
    }

    saveProcess(process: Process): Observable<any>{
        let params = JSON.stringify(process);
        let header = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.post(this.url+'saveProcess', params,{headers: header});
    }

    updateProcess(process: Process): Observable<any>{
        let params = JSON.stringify(process);
        let header = new HttpHeaders().set('Content-type','application/json');
        return this._http.put(this.url+'updateProcess/'+process.id,params, {headers:header});
    }
    logIn(user: User): Observable<any>{

        return this._http.post(this.url+'logins', user);
    }
}