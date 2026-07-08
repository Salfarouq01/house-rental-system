import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';


import { AuthService } from '../../../core/services/auth.service';




import { MatCardModule } from '@angular/material/card';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import {
  MatProgressSpinnerModule
} from '@angular/material/progress-spinner';
import { UserRole } from '../../../core/Models/user.model';



@Component({

selector:'app-login',

standalone:true,

imports:[

CommonModule,

ReactiveFormsModule,

MatCardModule,

MatInputModule,

MatButtonModule,

MatIconModule,

MatProgressSpinnerModule

],

templateUrl:'./login.html',

styleUrl:'./login.css'

})


export class LoginComponent {



private fb = inject(FormBuilder);

private router = inject(Router);

private authService = inject(AuthService);



loading = false;

errorMessage = '';




loginForm = this.fb.group({

email:[
'',
[
Validators.required,
Validators.email
]
],


password:[
'',
[
Validators.required,
Validators.minLength(4)
]
]


});





onLogin(){


if(this.loginForm.invalid){

return;

}



this.loading = true;

this.errorMessage = '';



const email =
this.loginForm.value.email ?? '';



const password =
this.loginForm.value.password ?? '';




setTimeout(()=>{



const success =
this.authService.login(
email,
password
);




if(!success){


this.errorMessage =
'Invalid email or password';


this.loading=false;


return;


}





const user =
this.authService.getUser();




switch(user?.role){

  case UserRole.ADMIN:
  this.router.navigate(['/admin/dashboard']);
  break;
  
  
  case UserRole.OWNER:
  this.router.navigate(['/owner/dashboard']);
  break;
  
  
  case UserRole.MANAGER:
  this.router.navigate(['/manager/dashboard']);
  break;
  
  
  case UserRole.ACCOUNTANT:
  this.router.navigate(['/accountant/dashboard']);
  break;
  
  
  case UserRole.TENANT:
  this.router.navigate(['/tenant/dashboard']);
  break;
  
  }



this.loading=false;



},800);



}





}