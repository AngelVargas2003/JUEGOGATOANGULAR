import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Juego } from 'src/app/models/PartidaI';
import { AuthService } from 'src/app/services/auth.service';
import {JuegogatoService} from 'src/app/services/juegogato.service'
@Component({
  selector: 'app-interface-partidas',
  templateUrl: './interface-partidas.component.html',
  styleUrls: ['./interface-partidas.component.css']
})
export class InterfacePartidasComponent implements OnInit {
  data:any
  User:any;
  Clave!:Number
  partidaForm!:FormGroup
  Partida!:Juego
  constructor(private fb:FormBuilder,private authService:AuthService,private juegogatoservice:JuegogatoService,private router:Router, private cookie:CookieService) { 
    this.createForm()
  }
  ngOnInit(): void {
    this.getPartidas()
    this.checkID()
    
  }
  createForm(): void {
    this.partidaForm = this.fb.group({
      clave:[null],
    })
  }
  displayedColumns: string[] = ['clave','Actions'];
  setPartidaI():void{
    this.Partida = {
      clave: this.partidaForm.get('clave')?.value,
      host:this.User.id
    }
  }
  crearPartida():void{
    this.setPartidaI()
    console.log(this.Partida)
    this.cookie.set('clave_partida', this.partidaForm.get('clave')?.value.toString())
    console.log('clave_partida')
    this.juegogatoservice.crear(this.Partida).subscribe((data:any)=>{
      console.log('Se inserto de manera correcta')
      this.router.navigate(['/juego'])
    })
    //this.router.navigate(['/partida'])
  }
  
  checkID():void{
    this.authService.checkID().subscribe((data:any)=>{
      this.User = data
    })
  }
  getPartidas(){
    this.juegogatoservice.get().subscribe((data:any)=>{
      this.data=data
    })
  }
  

}
