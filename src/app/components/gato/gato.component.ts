import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import {JuegogatoService} from 'src/app/services/juegogato.service'
@Component({
  selector: 'app-gato',
  templateUrl: './gato.component.html',
  styleUrls: ['./gato.component.css']
})
export class GatoComponent implements OnInit {
  columnas:string[]=["A",'B','C']
  filas:string[]=['1','2','3']
  tabler:any=[]
  User:any;
  valor:any
  partida:any
  constructor(private authService:AuthService,private cookie:CookieService,private juegogatoservice:JuegogatoService) 
  {

  }
  
  ngOnInit(): void {
    this.getPartida()
    this.getJugadorID()
    this.setTablero()
    this.setearTurnos()
  }
  setTablero(){
    this.columnas.forEach(C=>{
      this.filas.forEach(B=>{
        var aux={
          "Nombre":C+B,
          "Valor":""
        }
        this.tabler.push(aux)
      })
    })
  }
  getPartida(){
    this.juegogatoservice.getPartida(this.cookie.get('clave_partida')).subscribe((data:any)=>{
        this.partida=data[0]
    })
  }
  setearTurnos(){
  }
  jugar(casilla:number){
    console.log(casilla)
  }
  getJugadorID():void{
    this.authService.checkID().subscribe((data:any)=>{
      this.User=data
    })
  }

}
