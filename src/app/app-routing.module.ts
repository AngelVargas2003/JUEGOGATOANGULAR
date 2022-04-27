import { _fixedSizeVirtualScrollStrategyFactory } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MainComponent } from './components/main/main.component';
import { PartidanewComponent } from './components/partidanew/partidanew.component';
import { PartidasComponent } from './components/partidas/partidas.component';
import { VigilantGuardService } from './services/guards/vigilant-guard.service';
import {InterfacePartidasComponent} from 'src/app/components/interface-partidas/interface-partidas.component'
import {GatoComponent} from 'src/app/components/gato/gato.component'
const routes: Routes = [
  {path:'login',/*canActivate:[LogginGuard]*/ component: LoginComponent},
  {path:'register',/*canActivate:[VigilantGuardService],*/ component: RegisterComponent},
  {path:'main', canActivate:[VigilantGuardService], component: MainComponent},
  {path:'partidas', canActivate: [VigilantGuardService], component: PartidasComponent},
  {path:'partida', canActivate: [VigilantGuardService], component: PartidanewComponent},
  {path:'juego', canActivate: [VigilantGuardService], component: GatoComponent},
  {path:'menu', canActivate: [VigilantGuardService], component: InterfacePartidasComponent},
  {path:'**', redirectTo: '/login'},
  {path:'', redirectTo:'/login', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
