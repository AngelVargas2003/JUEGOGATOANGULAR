import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserI } from '../models/user-i';
import { UserLog } from '../models/user-log';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;

  constructor( private http:HttpClient, private cookieService:CookieService ) {}

  register(user:UserI):Observable<any>{
    return this.http.post(`${this.apiURL}/storeUser/:request`, user);
  }
  login(user:UserLog):Observable<any>{
    return this.http.post(`${this.apiURL}/login`, user);
  }
  logout():Observable<any>{
    return this.http.get(`${this.apiURL}/logout`);
  }
  checkRole():Observable<any>{
    return this.http.get(`${this.apiURL}/getRol`);
  }
  checkID():Observable<any>{
    return this.http.get(`${this.apiURL}/getInfoUser`);
  }

}
