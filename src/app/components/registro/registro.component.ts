import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {
   nombre:string=""
   correo:string=""
   clave: string=""
   conver:any

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  datos(){
     if (this.nombre == ""|| this.clave =="" || this.correo =="") {
       alert("Hay algun campo vacio...")
     } else {
      this.http.get("https://yanm.herokuapp.com/api/registrar/"+this.nombre+"/"+this.correo+"/"+this.clave+"")
      .subscribe(data=> {
        this.conver = data;
        alert(this.conver.Registro);
    })
    this.limpiar()
     }

  }
  limpiar(){
   this.nombre = "";
   this.correo = "";
   this.clave ="";
  }
  iniciar(){
    this.router.navigate(['login']);
  }

}
