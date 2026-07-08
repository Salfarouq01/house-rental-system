import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import {
  Router,
  ActivatedRoute
} from '@angular/router';


import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';


interface User {

  id:number;

  fullName:string;

  email:string;

  phone:string;

  username:string;

  password:string;

  role:string;

  status:boolean;

}



@Component({

  selector:'app-user-form',

  standalone:true,

  imports:[

    CommonModule,

    ReactiveFormsModule,

    MatCardModule,

    MatInputModule,

    MatButtonModule,

    MatSelectModule,

    MatSlideToggleModule,

    MatIconModule

  ],

  templateUrl:'./user-form.html',

  styleUrl:'./user-form.css'

})


export class UserFormComponent {


private fb = inject(FormBuilder);

private router = inject(Router);

private route = inject(ActivatedRoute);



isEdit=false;

userId=0;



roles=[

'ADMIN',

'OWNER',

'MANAGER',

'ACCOUNTANT',

'TENANT'

];





form=this.fb.group({


fullName:[

'',

Validators.required

],



email:[

'',

[

Validators.required,

Validators.email

]

],



phone:[

'',

Validators.required

],



username:[

'',

Validators.required

],



password:[

'',

Validators.required

],



role:[

'',

Validators.required

],



status:[

true

]


});






constructor(){


const id=this.route.snapshot.paramMap.get('id');


if(id){

this.isEdit=true;

this.userId=Number(id);


// Later replace with service

this.loadUser(this.userId);


}


}






loadUser(id:number){


// dummy data


const user:User={


id:1,

fullName:'System Administrator',

email:'admin@gmail.com',

phone:'0712345678',

username:'admin',

password:'1234',

role:'ADMIN',

status:true


};



this.form.patchValue(user);


}






save(){


if(this.form.invalid){

return;

}



const user:User={


id:this.isEdit?

this.userId:

0,


fullName:this.form.value.fullName ?? '',


email:this.form.value.email ?? '',


phone:this.form.value.phone ?? '',


username:this.form.value.username ?? '',


password:this.form.value.password ?? '',


role:this.form.value.role ?? '',


status:this.form.value.status ?? true


};



console.log(user);


// later connect UserService



this.router.navigate([

'/admin/users'

]);


}





cancel(){


this.router.navigate([

'/admin/users'

]);


}



}