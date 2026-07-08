import { Routes } from '@angular/router';

import { LoginComponent } 
from './pages/auth/login/login';

import { LayoutComponent } 
from './core/layout/layout/layout';


import { authGuard } 
from './core/guards/auth-guard';

import { roleGuard } 
from './core/guards/role-guard';

import { permissionGuard } 
from './core/guards/permission-guard';


import { UserRole } 
from './core/Models/user.model';


import { Permission } 
from './core/Models/permission.model';



export const routes: Routes = [



{
path:'',

redirectTo:'login',

pathMatch:'full'

},




{
path:'login',

component:LoginComponent

},





/*
=================================
 MAIN APPLICATION LAYOUT
=================================
*/


{
path:'',

component:LayoutComponent,

canActivate:[
authGuard
],



children:[



/*
=================================
 DASHBOARDS
=================================
*/


{
path:'admin/dashboard',

canActivate:[
roleGuard
],

data:{

roles:[
UserRole.ADMIN
]

},


loadComponent:()=> 
import('./pages/dashboard/dashboard/dashboard')
.then(
m=>m.DashboardComponent
)

},




{
path:'owner/dashboard',

canActivate:[
roleGuard
],

data:{

roles:[
UserRole.OWNER
]

},


loadComponent:()=> 
import('./pages/owner/dashboard/owner-dashboard/owner-dashboard')
.then(
m=>m.OwnerDashboardComponent
)

},





{
path:'manager/dashboard',

canActivate:[
roleGuard
],

data:{

roles:[
UserRole.MANAGER
]

},


loadComponent:()=> 
import('./pages/manager/dashboard/manager-dashboard/manager-dashboard')
.then(
m=>m.ManagerDashboardComponent
)

},





{
path:'accountant/dashboard',

canActivate:[
roleGuard
],

data:{

roles:[
UserRole.ACCOUNTANT
]

},


loadComponent:()=> 
import('./pages/accountant/dashboard/accountant-dashboard/accountant-dashboard')
.then(
m=>m.AccountantDashboardComponent
)

},





{
path:'tenant/dashboard',

canActivate:[
roleGuard
],

data:{

roles:[
UserRole.TENANT
]

},


loadComponent:()=> 
import('./pages/tenant/dashboard/tenant-dashboard/tenant-dashboard')
.then(
m=>m.TenantDashboard
)

},







/*
=================================
 HOUSE MANAGEMENT
=================================
*/


{
path:'houses',

canActivate:[
permissionGuard
],

data:{

permission:
Permission.MANAGE_HOUSES

},


loadComponent:()=> 
import('./pages/houses/house-list/house-list')
.then(
m=>m.HouseListComponent
)

},





{
path:'rooms',

canActivate:[
permissionGuard
],

data:{

permission:
Permission.MANAGE_ROOMS

},


loadComponent:()=> 
import('./pages/rooms/room-list/room-list')
.then(
m=>m.RoomListComponent
)

},






{
path:'tenants',

canActivate:[
permissionGuard
],

data:{

permission:
Permission.MANAGE_TENANTS

},


loadComponent:()=> 
import('./pages/tenants/tenant-list/tenant-list')
.then(
m=>m.TenantListComponent
)

},







/*
=================================
 PAYMENT MANAGEMENT
=================================
*/


{
path:'payments',

canActivate:[
permissionGuard
],

data:{

permission:
Permission.MANAGE_PAYMENTS

},


loadComponent:()=> 
import('./pages/payments/payment-list/payment-list')
.then(
m=>m.PaymentListComponent
)

},







/*
=================================
 REPORTS
=================================
*/


{
path:'reports',

canActivate:[
permissionGuard
],

data:{

permission:
Permission.VIEW_REPORTS

},


loadComponent:()=> 
import('./pages/reports/report-dashboard/report-dashboard')
.then(
m=>m.ReportDashboardComponent
)

},







/*
=================================
 ADMINISTRATION
=================================
*/


{
path:'admin/users',

canActivate:[
permissionGuard
],

data:{

permission:
Permission.MANAGE_USERS

},


loadComponent:()=> 
import('./pages/admin/users/user-list/user-list')
.then(
m=>m.UserListComponent
)

},






{
path:'admin/roles',

canActivate:[
permissionGuard
],

data:{

permission:
Permission.MANAGE_ROLES

},


loadComponent:()=> 
import('./pages/admin/roles/role-list/role-list')
.then(
m=>m.RoleListComponent
)

},







/*
=================================
 UNAUTHORIZED
=================================
*/


{
path:'unauthorized',

loadComponent:()=> 
import('./pages/unauthorized/unauthorized')
.then(
m=>m.UnauthorizedComponent
)

}




]

},






{
path:'**',

redirectTo:'login'

}



];