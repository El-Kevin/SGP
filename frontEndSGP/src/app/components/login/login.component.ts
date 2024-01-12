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
  username: string = '';
  password: string = '';
  constructor(private _processService: ProcessService, 
    private router: Router){
    
  }
  ngOnInit(): void {
  
  }

login(){
  //validar datos
  if(this.username == '' || this.password == ''){
    console.log("faltan datos")
    return
  }
  //creamos el body
  const user: User = {
    username: this.username,
    password: this.password
  }
  console.log(user)
  this._processService.logIn(user).subscribe(
    Response => {
      localStorage.setItem('token', Response.token)
      localStorage.setItem('id_user', Response.id_user)
      this.router.navigate(['/process']);
      //console.log("todo bien muy bien")
      //console.log(Response.token, Response.username, Response.id_user)
      
      console.log(Response);
    },
    error => {
      
      console.log(<any>error)
    }
  )


}
}
