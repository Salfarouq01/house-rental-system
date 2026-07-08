import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Router,
  RouterModule
} from '@angular/router';

import {
  FormsModule
} from '@angular/forms';


import {
  MatTableModule
} from '@angular/material/table';


import {
  MatButtonModule
} from '@angular/material/button';


import {
  MatIconModule
} from '@angular/material/icon';


import {
  MatFormFieldModule
} from '@angular/material/form-field';


import {
  MatInputModule
} from '@angular/material/input';


import {
  MatSelectModule
} from '@angular/material/select';


import {
  MatSlideToggleModule
} from '@angular/material/slide-toggle';


import {
  MatCardModule
} from '@angular/material/card';


import {
  MatOptionModule
} from '@angular/material/core';



import {
 User,
 UserRole
} from '../../../../core/Models/user.model';



import {
 Permission
} from '../../../../core/Models/permission.model';




@Component({

selector:'app-user-list',

standalone:true,

imports:[

CommonModule,

RouterModule,

FormsModule,

MatTableModule,

MatButtonModule,

MatIconModule,

MatFormFieldModule,

MatInputModule,

MatSelectModule,

MatSlideToggleModule,

MatCardModule,

MatOptionModule

],


templateUrl:'./user-list.html',

styleUrl:'./user-list.css'

})


export class UserListComponent {
permissions(arg0: any) {
throw new Error('Method not implemented.');
}



constructor(
private router:Router
){}





displayedColumns:string[]=[

'id',

'name',

'email',

'phone',

'role',

'status',

'actions'

];





search:string='';



selectedRole:string='';





roles = Object.values(UserRole);





users:User[]=[



{

id:1,

fullName:'System Administrator',

email:'admin@gmail.com',

username:'admin',

password:'1234',

phone:'0712345678',

role:UserRole.ADMIN,


permissions:[

Permission.VIEW_DASHBOARD,

Permission.MANAGE_HOUSES,

Permission.MANAGE_ROOMS,

Permission.MANAGE_TENANTS,

Permission.MANAGE_PAYMENTS,

Permission.VIEW_REPORTS,

Permission.MANAGE_USERS,

Permission.MANAGE_ROLES

],


status:'Active',

createdAt:new Date().toISOString()

},





{

id:2,

fullName:'Ali Mohamed',

email:'owner@gmail.com',

username:'owner',

password:'1234',

phone:'0744556677',

role:UserRole.OWNER,


permissions:[

Permission.VIEW_DASHBOARD,

Permission.MANAGE_HOUSES,

Permission.MANAGE_ROOMS,

Permission.VIEW_REPORTS

],


status:'Active',

createdAt:new Date().toISOString()

},





{

id:3,

fullName:'Sara Hassan',

email:'manager@gmail.com',

username:'manager',

password:'1234',

phone:'0755112233',

role:UserRole.MANAGER,


permissions:[

Permission.VIEW_DASHBOARD,

Permission.MANAGE_HOUSES,

Permission.MANAGE_ROOMS,

Permission.MANAGE_TENANTS,

Permission.MANAGE_PAYMENTS

],


status:'Active',

createdAt:new Date().toISOString()

},





{

id:4,

fullName:'Ahmed Omar',

email:'accountant@gmail.com',

username:'accountant',

password:'1234',

phone:'0788776655',

role:UserRole.ACCOUNTANT,


permissions:[

Permission.VIEW_DASHBOARD,

Permission.MANAGE_PAYMENTS,

Permission.VIEW_REPORTS

],


status:'Inactive',

createdAt:new Date().toISOString()

}



];






// ============================
// SUMMARY CARDS
// ============================


get totalUsers():number{

return this.users.length;

}





get activeUsers():number{

return this.users.filter(

user=>user.status==='Active'

).length;

}





get inactiveUsers():number{

return this.users.filter(

user=>user.status==='Inactive'

).length;

}





// ============================
// SEARCH + FILTER
// ============================


get filteredUsers():User[]{


const text =
this.search.toLowerCase();



return this.users.filter(user=>{


const roleMatch =

this.selectedRole === ''

||

user.role === this.selectedRole;



const searchMatch =

user.fullName
.toLowerCase()
.includes(text)

||

user.email
.toLowerCase()
.includes(text)

||

user.username
.toLowerCase()
.includes(text);



return roleMatch && searchMatch;



});


}






// ============================
// ACTIONS
// ============================


addUser(){

this.router.navigate([

'/admin/users/add'

]);

}





editUser(id:number){

this.router.navigate([

'/admin/users/edit',

id

]);

}





managePermission(id:number){

this.router.navigate([

'/admin/users/permissions',

id

]);

}





toggleStatus(user:User){


user.status =

user.status==='Active'

?

'Inactive'

:

'Active';


}







deleteUser(id:number){



const confirmDelete =
confirm(

'Are you sure you want to delete this user?'

);



if(confirmDelete){


this.users =

this.users.filter(

user=>user.id!==id

);


}



}





}