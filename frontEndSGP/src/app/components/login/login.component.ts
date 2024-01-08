import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ProcessService } from 'src/app/services/process.service'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ProcessService]
})
export class LoginComponent implements OnInit{
  name: string = '';
  password: string = '';
  constructor(private _processService: ProcessService, 
    private router: Router){
    
  }
  ngOnInit(): void {
  
  }

login(){
  //validar datos
  if(this.name == '' || this.password == ''){
    console.log("faltan datos")
    return
  }
  //creamos el body
  const user: User = {
    name: this.name,
    password: this.password
  }
  console.log(user)
  this._processService.logIn(user).subscribe(
    Response => {
      localStorage.setItem('token', Response.token)
      this.router.navigate(['/process']);
      
      console.log(Response);
    },
    error => {
      
      console.log(<any>error)
    }
  )


}
}
