import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, successDialog, timeMessage } from 'src/app/assets/alerts';
import { UserI } from 'src/app/models/user-i';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  User!: UserI;
  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router) {
    this.createFrom();
   }

  ngOnInit(): void {
  }
  
  register(): void{
    if(this.registerForm.invalid){
      return Object.values(this.registerForm.controls).forEach(control=> {
        control.markAsTouched();
      });
    }else{
      this.setUser();
      this.authService.register(this.User).subscribe((data:any)=>{
        timeMessage('Registrando',1500).then(() => {
          successDialog('Registro Completado');
          this.router.navigate(['/login']);
        })
      }, error => {
        errorMessage('Ha ocurrido un error')
      });
    }
  }

  createFrom():void{
    this.registerForm = this.fb.group({
      user:['',[Validators.required]],
      email:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password:['',[Validators.required]],
      password2:['',[Validators.required]]
    })
  }
  get userValidate(){
    return(
      this.registerForm.get('user')?.invalid && this.registerForm.get('user')?.touched
    );
    
  }
  get emailValidate(){
    return(
      this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched
    );
    
  }
  get passwordValidate(){
    return(
      this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched
    );
    
  }
  get password2Validate(){
    const pass = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    return pass === pass2 ? false : true
    
  }
  setUser():void{
    this.User = {
      Nombre: this.registerForm.get('user')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    }
  }
}
