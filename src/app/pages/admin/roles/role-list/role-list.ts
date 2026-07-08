import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



interface Role {

  id:number;

  name:string;

  description:string;

  users:number;

  permissions:number;

}



@Component({

  selector:'app-role-list',

  standalone:true,

  imports:[

    CommonModule,

    MatCardModule,

    MatTableModule,

    MatButtonModule,

    MatIconModule

  ],

  templateUrl:'./role-list.html',

  styleUrl:'./role-list.css'

})


export class RoleListComponent {
totalPermissions: any;
totalUsers: any;


constructor(
private router:Router
){}



displayedColumns=[

'id',

'name',

'description',

'users',

'permissions',

'actions'

];





roles:Role[]=[


{

id:1,

name:'ADMIN',

description:'Full system access',

users:1,

permissions:25

},



{

id:2,

name:'OWNER',

description:'Manage own properties',

users:5,

permissions:12

},



{

id:3,

name:'MANAGER',

description:'Manage houses, rooms and tenants',

users:8,

permissions:15

},



{

id:4,

name:'ACCOUNTANT',

description:'Manage payments and reports',

users:3,

permissions:8

},



{

id:5,

name:'TENANT',

description:'Tenant account access',

users:50,

permissions:3

}


];





addRole(){

this.router.navigate([

'/admin/roles/add'

]);

}





editRole(id:number){

this.router.navigate([

'/admin/roles/edit',

id

]);

}





managePermission(id:number){

this.router.navigate([

'/admin/roles/permissions',

id

]);

}





deleteRole(id:number){


if(confirm('Delete this role?')){


this.roles=this.roles.filter(

r=>r.id!==id

);


}



}



}