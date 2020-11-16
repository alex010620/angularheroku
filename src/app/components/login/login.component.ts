import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { from } from 'rxjs';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  convercion : any;
  convercio : any;
  user: string=""
  pass: string=""
  res: number
  er:any
  cambio: boolean = false
  hg:any
  reestal:string=""
  center:any
  constructor(private http: HttpClient, private router: Router) {
    if(this.user == ""){
      this.router.navigate(['login']);
    }
   }

  ngOnInit(): void {
  }
  datos(){
    if (this.user =="" || this.pass=="") {
      alert("Los campos de logueo no pueden estar vacios")
    } else {
      this.http.get("https://yanm.herokuapp.com/api/iniciar/"+this.user+"/"+this.pass+"")
    .subscribe(data=> {
        this.convercion = data;
          if (this.convercion == "Las credenciales son incorrectas") {
        alert(this.convercion)
    } else {
            localStorage.removeItem('llave')//Elimino el item para que no se repita cada vez que inicia la aplicacion
            localStorage.clear()//por si las moscas
            localStorage.setItem('llave', JSON.stringify(this.convercion));

            this.center = JSON.parse(localStorage.getItem('llave'))
            this.er = this.center.correo
              this.cambio = true
              this.router.navigate(['home']);

          console.log(this.er)

    }
    })
    }

  }
emi(){
  this.messageEvent.emit(this.convercion.valor)
}
  irRegistro(){
    this.router.navigate(['registro']);
  }
  ocultarLogin(){
    document.getElementById('OlvidemiPass').style.display="block"
    document.getElementById('login').style.display="none"
  }
  OcultarRecordar(){
    this.reestal=""
    document.getElementById('e').style.display="none"
    document.getElementById('OlvidemiPass').style.display="none"
    document.getElementById('login').style.display="block"
  }
  buscar(){
    if (this.reestal=="") {
      alert("el campo de busqueda esta vacio")
    } else {
      this.http.get("https://yanm.herokuapp.com/api/NotRemmenver/"+this.reestal+"")
    .subscribe(data=> {
        this.convercio = data;
        this.hg = this.convercio.pass
        document.getElementById('e').style.display="block"
    })
    }
  }
}
