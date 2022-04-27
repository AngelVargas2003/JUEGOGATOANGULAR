import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { ActualizarI } from 'src/app/interfaces/actualizar';
import { JugadorI } from 'src/app/interfaces/jugador';
import { PartidaI } from 'src/app/interfaces/partida';
import { AuthService } from 'src/app/services/auth.service';
import { PartidasService } from 'src/app/services/crud/partidas/partidas.service';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.css']
})
export class PartidasComponent implements OnInit {
  data: any;
  User: any;
  Clave!: number;
  partidaForm!: FormGroup;
  monitorForm!: FormGroup;
  Partida!: PartidaI;
  Actualizar!:ActualizarI;
  Jugador!:JugadorI;
  subscription!: Subscription;
  mostrarMoni :boolean = false
  monitores: any = []
  Papa: any;



  constructor(private fb:FormBuilder, private partidasService:PartidasService, private authService:AuthService, private router:Router, private cookie:CookieService) {
    this.createForm();
    this.createForm2();
    this.getPartidas();
    this.checkID();
   }

  ngOnInit(): void {
    this.subscription = this.partidasService.refresh$.subscribe(()=>{
      this.getPartidas();
    })
  }

  displayedColumns: string[] = ['Clave','Actions'];

  entrarPartida(clave_sala:number):void{
    this.partidasService.getPosicion(clave_sala).subscribe((data:any)=>{
      this.Papa = data[0]
    })
    this.Actualizar = {
      clave_sala:clave_sala,
      monitor: this.monitorForm.get('monitor')?.value,
      newmoni: this.Papa.jugadores.length
    }
    this.Jugador = {
      clave_sala:clave_sala,
      monitor: this.monitorForm.get('monitor')?.value,
      jugador:this.User.id
    }
    this.cookie.set('clave_partida', clave_sala.toString())
    this.partidasService.modificar(this.Actualizar).subscribe((data:any)=>{
      this.partidasService.agregarJugador(this.Jugador).subscribe((data:any)=>{
        console.log('Se entro con exito')

        this.router.navigate(['/partida'])
      })
    })
  }

  crearPartida():void{
    this.setPartidaI()
    console.log(this.Partida)
    this.cookie.set('clave_partida', this.partidaForm.get('clave')?.value.toString())
    console.log(this.cookie.get('clave_partida'))
    this.partidasService.crear(this.Partida).subscribe((data:any)=>{
      console.log('Se inserto de manera correcta')
      this.router.navigate(['/partida'])
    })
    //this.router.navigate(['/partida'])
  }

  getPartidas():void{
    this.partidasService.get().subscribe((data:any)=>{
      this.data = data
      console.log(this.data)
    })
  }

  checkID():void{
    this.authService.checkID().subscribe((data:any)=>{
      this.User = data
    })
  }

  setPartida():void{
    this.Partida = {
      Clave: this.partidaForm.get('clave')?.value,
      posicion: 1,
      jugador:this.User.id,
      monitor:this.monitorForm.get('monitor')?.value,
      main:1
    }
  }
  setPartidaI():void{
    this.Partida = {
      Clave: this.partidaForm.get('clave')?.value,
      posicion: 1,
      jugador:this.User.id,
      monitor:1,
      main:1
    }
  }

  createForm(): void {
    this.partidaForm = this.fb.group({
      clave:[null],
    })
  }

  createForm2(): void {
    this.monitorForm = this.fb.group({
      monitor:[null],
    })
  }
  mostrarMonitor(clave):void{
    this.partidasService.getPosicion(clave).subscribe((data:any)=>{
      for(let i = 0; i <= data[0].jugadores.length;i++){
        this.monitores.push({valor: i + 1})
      }

    })
    this.mostrarMoni = true
  }

}
