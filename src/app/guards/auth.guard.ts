import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
center:any
cor:any=""
contad: string=""
  constructor(private router:Router){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      this.center = JSON.parse(localStorage.getItem('llave'))
      this.cor= this.center.correo;
      this.contad = this.center.iniciadoSesion;
      if(this.cor == "" || this.contad==""){
        this.router.navigate(['/login']);
        return false;
      }else{
        return true;
      }
  }

}
