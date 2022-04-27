import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { interval, Subscription } from 'rxjs';
import { Actpos } from 'src/app/interfaces/actpos';
import { AuthService } from 'src/app/services/auth.service';
import { PartidasService } from 'src/app/services/crud/partidas/partidas.service';

@Component({
  selector: 'app-partidanew',
  templateUrl: './partidanew.component.html',
  styleUrls: ['./partidanew.component.css']
})
export class PartidanewComponent implements OnInit {

  Grid:any = [
    {casilla:1, barco:false},
    {casilla:2, barco:false},
    {casilla:3, barco:false},
    {casilla:4, barco:false},
    {casilla:5, barco:false},
  ]
  Posicion: any;
  subscription!:Subscription
  User: any;
  UserMon:any;
  newPos!:Actpos;
  constructor(private partidasService:PartidasService, private cookie:CookieService, private authService:AuthService) {
    this.getPosicion();
    this.getJugadorID();
    const contador = interval(3000)
    contador.subscribe(()=>{
      this.getPosicion();
      this.actualizarPos();
    })
   }

  ngOnInit(): void {
    this.subscription = this.partidasService.refresh$.subscribe(()=>{
      this.getPosicion();
    })
  }

  getPosicion():void{
    this.partidasService.getPosicion(this.cookie.get('clave_partida')).subscribe((data:any)=>{
      this.Posicion = data[0]
      console.log(this.Posicion.jugadores.length)
      for(let i = 0; i < this.Posicion.jugadores.length; i++){
        if (this.Posicion.jugadores[i].id_jugador == this.User.id){
          this.UserMon = this.Posicion.jugadores[i].monitor
        }
      }
      for(let i = 0; i < this.Grid.length; i++){
        if(this.Grid[i].casilla == this.Posicion.posicion && this.UserMon == this.Posicion.main){
            this.Grid[i].barco = true
        }
        else{
          this.Grid[i].barco = false
        }
      }

    })
  }

  actualizarPos():void{
    this.setPos();
    this.partidasService.actualizarPosicion(this.newPos).subscribe((data:any)=>{
      console.log('Se actualizo de manera correcta')
    })
  }

  setPos():void{
    var pos
    var mon
    console.log(mon)
    if (this.Posicion.posicion == 5){
      if(this.Posicion.main == this.Posicion.jugadores.length){
        mon = 1
      }
      else{
        mon = this.Posicion.main + 1
      }
      pos = 1

    }
    else{
      mon = this.Posicion.main
      pos = this.Posicion.posicion + 1
    }
    this.newPos = {
      clave_sala: parseInt(this.cookie.get('clave_partida')),
      posicion: pos,
      main: mon,
    }
  }
  salir():void{
    this.partidasService.salir(this.User.id).subscribe((data:any)=>{

    })
  }

  getJugadorID():void{
    this.authService.checkID().subscribe((data:any)=>{
      this.User = data
      console.log(this.User)
    })
  }

}
