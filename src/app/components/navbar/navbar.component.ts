import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { errorMessage, successDialog, timeMessage } from 'src/app/assets/alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cookie:CookieService, private authService:AuthService, private router:Router ) { }

  ngOnInit(): void {
  }
  destroycookie(): void{
    this.cookie.delete('Equipo')
  }
  logout(): void {
    this.authService.logout().subscribe((data:any)=>{
      timeMessage('Saliendo...',1500).then(() => {
        this.cookie.delete('token');
        successDialog('Logout Completado');
        this.router.navigate(['/login']);
      })
    }, error => {
      errorMessage('Ha ocurrido un error')
    });
  }
}
