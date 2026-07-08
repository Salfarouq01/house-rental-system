import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { LayoutComponent } from './core/layout/layout/layout';
import { UserRole } from './core/Models/user.model';
import { LoginComponent } from './pages/auth/login/login';

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
    =====================
     ADMIN AREA
    =====================
    */
    
    {
     path:'',
     component:LayoutComponent,
    
     canActivate:[
       authGuard,
       roleGuard
     ],
    
     data:{
       role:UserRole.ADMIN
     },
    
    
     children:[
    
    
     {
      path:'admin/dashboard',
    
      loadComponent:()=> 
      import('./pages/dashboard/dashboard/dashboard')
      .then(
       m=>m.DashboardComponent
      )
     },
    
    
     {
      path:'houses',
    
      loadComponent:()=> 
      import('./pages/houses/house-list/house-list')
      .then(
       m=>m.HouseListComponent
      )
     },
    
    
     {
      path:'rooms',
    
      loadComponent:()=> 
      import('./pages/rooms/room-list/room-list')
      .then(
       m=>m.RoomListComponent
      )
     },
    
    
     {
      path:'tenants',
    
      loadComponent:()=> 
      import('./pages/tenants/tenant-list/tenant-list')
      .then(
       m=>m.TenantListComponent
      )
     },
    
    
     {
      path:'payments',
    
      loadComponent:()=> 
      import('./pages/payments/payment-list/payment-list')
      .then(
       m=>m.PaymentListComponent
      )
     },
    
    
     {
      path:'reports',
    
      loadComponent:()=> 
      import('./pages/reports/report-dashboard/report-dashboard')
      .then(
       m=>m.ReportDashboardComponent
      )
     }
    
    
     ]
    
    },
    
    
    
    
    
    /*
    =====================
     OWNER AREA
    =====================
    */
    
    
    {
     path:'owner',
    
     component:LayoutComponent,
    
     canActivate:[
       authGuard,
       roleGuard
     ],
    
     data:{
       role:UserRole.OWNER
     },
    
    
     children:[
    
    
     {
     path:'dashboard',
    
     loadComponent:()=> 
     import('./pages/owner/dashboard/owner-dashboard/owner-dashboard')
     .then(
     m=>m.OwnerDashboardComponent
     )
    
     }
    
    
     ]
    
    },
    
    
    
    
    
    /*
    =====================
     MANAGER AREA
    =====================
    */
    
    
    {
     path:'manager',
    
     component:LayoutComponent,
    
     canActivate:[
     authGuard,
     roleGuard
     ],
    
    
     data:{
     role:UserRole.MANAGER
     },
    
    
     children:[
    
    
     {
     path:'dashboard',
    
     loadComponent:()=> 
     import('./pages/manager/dashboard/manager-dashboard/manager-dashboard')
     .then(
     m=>m.ManagerDashboardComponent
     )
    
     }
    
    
     ]
    
    },
    
    
    
    
    
    
    /*
    =====================
     ACCOUNTANT AREA
    =====================
    */
    
    
    {
     path:'accountant',
    
     component:LayoutComponent,
    
     canActivate:[
     authGuard,
     roleGuard
     ],
    
    
     data:{
     role:UserRole.ACCOUNTANT
     },
    
    
     children:[
    
    
     {
     path:'dashboard',
    
     loadComponent:()=> 
     import('./pages/accountant/dashboard/accountant-dashboard/accountant-dashboard')
     .then(
     m=>m.AccountantDashboardComponent
     )
    
     }
    
    
     ]
    
    },
    
    
    
    
    
    
    /*
    =====================
     TENANT AREA
    =====================
    */
    
    
    {
     path:'tenant',
    
     component:LayoutComponent,
    
     canActivate:[
     authGuard,
     roleGuard
     ],
    
    
     data:{
     role:UserRole.TENANT
     },
    
    
     children:[
    
    
     {
     path:'dashboard',
    
     loadComponent:()=> 
     import('./pages/tenant/dashboard/tenant-dashboard/tenant-dashboard')
     .then(
     m=>m.TenantDashboard
     )
    
     }
    
    
     ]
    
    },
    
    
    
    
    
    {
     path:'**',
     redirectTo:'login'
    }
    
    
    ];