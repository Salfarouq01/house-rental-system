import { Component, inject } from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule,
  Router
} from '@angular/router';


import {
  MatSidenavModule
} from '@angular/material/sidenav';


import {
  MatToolbarModule
} from '@angular/material/toolbar';


import {
  MatListModule
} from '@angular/material/list';


import {
  MatButtonModule
} from '@angular/material/button';


import {
  MatIconModule
} from '@angular/material/icon';



import {
  AuthService
} from '../../services/auth.service';


import {
  User
} from '../../Models/user.model';


import {
  Permission
} from '../../Models/permission.model';



@Component({

selector:'app-layout',

standalone:true,

imports:[

CommonModule,

RouterModule,

MatSidenavModule,

MatToolbarModule,

MatListModule,

MatButtonModule,

MatIconModule

],

templateUrl:'./layout.html',

styleUrl:'./layout.css'

})


export class LayoutComponent {



private authService = inject(AuthService);

private router = inject(Router);





user:User|null =
this.authService.getUser();





menus = [



{
title:'Dashboard',

icon:'dashboard',

path:'/admin/dashboard',

permission:Permission.VIEW_DASHBOARD

},




{
title:'Houses',

icon:'home',

path:'/houses',

permission:Permission.MANAGE_HOUSES

},




{
title:'Rooms',

icon:'meeting_room',

path:'/rooms',

permission:Permission.MANAGE_ROOMS

},




{
title:'Tenants',

icon:'people',

path:'/tenants',

permission:Permission.MANAGE_TENANTS

},




{
title:'Payments',

icon:'payments',

path:'/payments',

permission:Permission.MANAGE_PAYMENTS

},




{
title:'Reports',

icon:'assessment',

path:'/reports',

permission:Permission.VIEW_REPORTS

},




{
title:'Users',

icon:'manage_accounts',

path:'/admin/users',

permission:Permission.MANAGE_USERS

},




{
title:'Roles',

icon:'security',

path:'/admin/roles',

permission:Permission.MANAGE_ROLES

}



];







hasPermission(
permission:Permission
):boolean{


return this.authService.hasPermission(permission);


}







logout():void{


this.authService.logout();


this.router.navigate([
'/login'
]);


}





}