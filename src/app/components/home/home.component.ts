import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
resp:string="Bienvenido"
conf;
respa:string
repositorio:any
titulo:string = ""
despcripcion:string =""
valor:string=""
fecha:string=""
lugar:string=""
long:string=""
NNombre:string=""
Ncorreo:string=""
OlPass:string=""
NPass:string=""
conver:any
center:any
key:any
cor:any
dr:any
cargo:object
contad: string
verificar:string=""
nombre:any
intervalo;

message:string;

ngOnInit(){
  this.center = JSON.parse(localStorage.getItem('llave'))
  this.key = this.center.key;
  this.cor= this.center.correo;
  this.contad = this.center.iniciadoSesion;
  this.verificar = this.center.Titulo
  console.log(this.key)

  if(this.cor=="" || this.contad==""){
    this.router.navigate(['login']);
  }

  }
  constructor(private router:Router, private http: HttpClient
) {
  if(this.cor=="" || this.contad==""){
    this.router.navigate(['login']);
  }
  }

guardar(){
  if (this.titulo == ""|| this.despcripcion=="" || this.valor =="" || this.fecha=="" || this.lugar=="" || this.long=="") {
    alert("Hay un campo de texto vacio o todos ellos lo estan...")
  } else {
    this.http.get("/api/regSecretos/"+this.titulo+"/"+this.despcripcion+"/"+this.valor+"/"+this.fecha+"/"+this.lugar+"/"+this.long+"/"+this.key+"/"+this.cor+"")
    .subscribe(data=> {
      this.conver = data;
      alert(this.conver.respuesta);
    });
  this.repositorio={"Titulo":this.titulo,"Descripcion":this.despcripcion,"ValorMonetario":this.valor,"Fecha":this.fecha,"Lugar":this.lugar,"LongitudYLatitud":this.long}
  localStorage.setItem('guardar', JSON.stringify(this.repositorio));
  this.center = JSON.parse(localStorage.getItem('guardar'))

    this.limpiar();
  }

}

confSalir(){
  this.conf = confirm("Quieres salir de la pagina?");
  if (this.conf==true) {
    this.http.get("/api/salir/"+this.key+"")
    localStorage.clear()
    localStorage.removeItem('llave');
       this.router.navigate(['login']);
  }
}
salir(){

  }

limpiar(){
  this.titulo="";
  this.despcripcion="";
  this.valor ="";
  this.lugar = "";
  this.long ="";
  this.fecha = "";
  this.NNombre="";
  this.Ncorreo="";
  this.OlPass="";
  this.NPass="";
}

global(){

}

mostrar(){

  if(this.verificar==""){
   document.getElementById('alertaNosecreto').style.display="block";
   document.getElementById('mostrarOcurtar').style.display="none";
  }else{
    document.getElementById('mostrarOcurtar').style.display="block";
  }

}
ocurtar(){
  document.getElementById('alertaNosecreto').style.display="none";
  document.getElementById('mostrarOcurtar').style.display="none";
  document.getElementById('alerta').style.display="none";
}
ocurtarDiv(){
  this.conf = confirm("Quieres eliminar tu secreto?");
  if (this.conf==true) {
  this.EliminarSecretos()
  localStorage.removeItem('guardar')
  document.getElementById('mostrarOcurtar').style.display="none";
   document.getElementById('alerta').style.display="block";
  }

}
 cargar(mensaje: object){
 this.cargo = mensaje;
 console.log(this.cargo)
 }

modificarCredenciales(){
  if (this.NNombre == ""|| this.Ncorreo=="") {
    alert("Hay un campo de texto vacio o todos ellos lo estan...")
  } else {
    this.http.get("/api/modificar/"+this.NNombre+"/"+this.Ncorreo+"/"+this.key+"")
    .subscribe(data=> {
      this.conver = data;
      alert(this.conver.respuesta);
      this.resp=this.conver.respuesta
    });
    this.limpiar();
  }
}
modificarPass(){
  if (this.OlPass == "" || this.NPass=="") {
    alert("Hay un campo de texto vacio o todos ellos lo estan...")
  } else {
    this.http.get("/api/ModClave/"+this.OlPass+"/"+this.key+"/"+this.NPass+"")
    .subscribe(data=> {
      this.dr = data;
      alert(this.dr.respuesta);
    });
    this.limpiar();
  }
}
EliminarSecretos(){
  this.http.get("/api/Eliminar/"+this.key+"")
    .subscribe(data=> {
      this.conver = data;
      this.respa=this.conver.respuesta
    });
}

}


