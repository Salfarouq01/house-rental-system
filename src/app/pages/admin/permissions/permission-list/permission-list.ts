import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';


import {
  ActivatedRoute,
  Router
} from '@angular/router';


import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';




interface Permission {


  id:number;

  name:string;

  description:string;

  assigned:boolean;


}





interface Role {


  id:number;

  name:string;


}





@Component({

  selector:'app-permission-management',

  standalone:true,


  imports:[
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],


  templateUrl:'./permission-list.html',

  styleUrl:'./permission-list.css'


})


export class PermissionManagementComponent {

private fb = inject(FormBuilder);
private router = inject(Router);
private route = inject(ActivatedRoute);

selectedRole:number = 0;

roles:Role[]=[
{
id:1,
name:'ADMIN'
},


{

id:2,

name:'OWNER'

},


{

id:3,

name:'MANAGER'

},


{

id:4,

name:'ACCOUNTANT'

},


{

id:5,

name:'TENANT'

}


];

permissions:Permission[]=[

{

id:1,

name:'MANAGE_USERS',

description:'Create and manage system users',

assigned:false

},

{

id:2,

name:'MANAGE_ROLES',

description:'Create roles and assign permissions',

assigned:false

},

{

id:3,

name:'MANAGE_HOUSES',

description:'Add, edit and delete houses',

assigned:false

},

{

id:4,

name:'MANAGE_ROOMS',

description:'Manage rooms availability',

assigned:false

},

{

id:5,

name:'MANAGE_TENANTS',

description:'Manage tenant information',

assigned:false

},

{

id:6,

name:'MANAGE_PAYMENTS',

description:'Manage rental payments',

assigned:false

},

{

id:7,

name:'VIEW_REPORTS',

description:'Access system reports',

assigned:false

},

{

id:8,

name:'DASHBOARD_ACCESS',

description:'View dashboard statistics',

assigned:false

}
];


constructor(){

const id =
this.route.snapshot.paramMap.get('id');

if(id){

this.selectedRole =
Number(id);

this.loadPermissions();

}

}

changeRole(){

this.loadPermissions();

}

loadPermissions(){

/*

Dummy permission loading

Later replace with API call

*/
if(this.selectedRole===1){
this.permissions.forEach(p=>{
p.assigned=true;

});

}

}

save(){

const data={

roleId:this.selectedRole,

permissions:
this.permissions

.filter(p=>p.assigned)

.map(p=>p.id)

};

console.log(data);
alert(

'Permissions saved successfully'
);

this.router.navigate([

'/admin/roles'

]);
}

cancel(){
this.router.navigate([

'/admin/roles'

]);
}
}