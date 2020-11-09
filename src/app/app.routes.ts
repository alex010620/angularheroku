
import {RouterModule, Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import {AuthGuard} from './guards/auth.guard'
const app_routes: Routes= [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent },
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  {path: 'registro', component: RegistroComponent},
]

export const app_routing = RouterModule.forRoot(app_routes);
