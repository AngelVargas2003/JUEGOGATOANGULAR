import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActualizarI } from 'src/app/interfaces/actualizar';
import { JugadorI } from 'src/app/interfaces/jugador';
import { PartidaI } from 'src/app/interfaces/partida';
import { environment } from 'src/environments/environment.prod';
import { tap } from 'rxjs/operators';
import { Actpos } from 'src/app/interfaces/actpos';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {

  apiURL = environment.apiURL;
  private _refresh$ = new Subject<void>();

  constructor(private http:HttpClient) { }


  get():Observable<any>{
    return this.http.get(`${this.apiURL}/verPartidas`)
  }

  crear(partida:PartidaI):Observable<any>{
    return this.http.post(`${this.apiURL}/iniciarPartida/:request`, partida).pipe(
      tap(()=>{
        this._refresh$.next()
      })
    )
  }

  modificar(actualizar:ActualizarI):Observable<any>{
    return this.http.put(`${this.apiURL}/modificarMonitor/:request`, actualizar).pipe(
      tap(()=>{
        this._refresh$.next()
      })
    )
  }

  agregarJugador(jugador:JugadorI):Observable<any>{
    return this.http.put(`${this.apiURL}/agregarJugador/:request`, jugador).pipe(
      tap(()=>{
        this._refresh$.next()
      })
    )
  }

  getPosicion(clave:any):Observable<any>{
    return this.http.get(`${this.apiURL}/getPartida/${clave}`)
  }

  actualizarPosicion(posiciones:Actpos):Observable<any>{
    return this.http.put(`${this.apiURL}/modificarPos/:request`, posiciones)
  }

  salir(id:Number):Observable<any>{
    return this.http.put(`${this.apiURL}/eliminarJugador/:request`, id).pipe(
      tap(()=>{
        this._refresh$.next()
      })
    )
  }

  get refresh$(){
    return this._refresh$
  }

}
