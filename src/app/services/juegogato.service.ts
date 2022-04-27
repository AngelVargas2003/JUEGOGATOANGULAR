import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Juego } from '../models/PartidaI';

@Injectable({
  providedIn: 'root'
})
export class JuegogatoService {
  apiURL = environment.apiURL;
  private _refresh$ = new Subject<void>();

  constructor(private http:HttpClient) { }
  
  get():Observable<any>{
    return this.http.get(`${this.apiURL}/verPartidas`)
  }
  crear(partida:Juego):Observable<any>{
    return this.http.post(`${this.apiURL}/crearPartida/:request`, partida).pipe(
      tap(()=>{
        this._refresh$.next()
      })
    )
  }
  hacerJugada(){
    
  }
  getPartida(clave:any){
    return this.http.get(`${this.apiURL}/getPartida/${clave}`)
  }
}
