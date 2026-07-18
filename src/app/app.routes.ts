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
    roleGuard,
    permissionGuard
  ],

  data:{

    roles:[
      UserRole.ADMIN,
      UserRole.OWNER
    ],

    permission:
    Permission.MANAGE_HOUSES

  },


  children:[


    {
      path:'',

      loadComponent:()=> 
      import('./pages/houses/house-list/house-list')
      .then(
        m=>m.HouseListComponent
      )

    },


    {
      path:'add',

      loadComponent:()=> 
      import('./pages/houses/house-form/house-form')
      .then(
        m=>m.HouseForm
      )

    },


    {
      path:'edit/:id',

      loadComponent:()=> 
      import('./pages/houses/house-form/house-form')
      .then(
        m=>m.HouseForm
      )

    }


  ]

},





{
  path:'rooms',

  canActivate:[
    roleGuard,
    permissionGuard
  ],

  data:{

    roles:[
      UserRole.ADMIN,
      UserRole.OWNER
    ],

    permission:
    Permission.MANAGE_HOUSES

  },


  children:[


    {
      path:'',

      loadComponent:()=> 
      import('./pages/rooms/room-list/room-list')
      .then(
        m=>m.RoomListComponent
      )

    },


    {
      path:'add',

      loadComponent:()=> 
      import('./pages/rooms/room-form/room-form')
      .then(
        m=>m.RoomFormComponent
      )

    },


    {
      path:'edit/:id',

      loadComponent:()=> 
      import('./pages/rooms/room-form/room-form')
      .then(
        m=>m.RoomFormComponent
      )

    }


  ]

},





{
  path:'tenants',

  canActivate:[
    roleGuard,
    permissionGuard
  ],

  data:{

    roles:[
      UserRole.ADMIN,
      UserRole.OWNER,
      UserRole.MANAGER
    ],

    permission:
    Permission.MANAGE_HOUSES

  },


  children:[


    {
      path:'',

      loadComponent:()=> 
      import('./pages/tenants/tenant-list/tenant-list')
      .then(
        m=>m.TenantListComponent
      )

    },


    {
      path:'add',

      loadComponent:()=> 
      import('./pages/tenants/tenant-form/tenant-form')
      .then(
        m=>m.TenantFormComponent
      )

    },


    {
      path:'edit/:id',

      loadComponent:()=> 
        import('./pages/tenants/tenant-form/tenant-form')
        .then(
          m=>m.TenantFormComponent
        )
  
    }


  ]

},







/*
=================================
 PAYMENT MANAGEMENT
=================================
*/


{
  path:'payments',

  canActivate:[
    roleGuard,
    permissionGuard
  ],

  data:{

    roles:[
      UserRole.ADMIN,
      UserRole.OWNER,
      UserRole.MANAGER
    ],

    permission:
    Permission.MANAGE_HOUSES

  },


  children:[


    {
      path:'',

      loadComponent:()=> 
      import('./pages/payments/payment-list/payment-list')
      .then(
        m=>m.PaymentListComponent
      )

    },


    {
      path:'add',

      loadComponent:()=> 
      import('./pages/payments/payment-form/payment-form')
      .then(
        m=>m.PaymentFormComponent
      )

    },


    {
      path:'edit/:id',

      loadComponent:()=> 
        import('./pages/payments/payment-form/payment-form')
        .then(
          m=>m.PaymentFormComponent
        )
  
    }


  ]

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
  path:'splash',
  
  loadComponent:()=> 
  import('./pages/splash/splash')
  .then(
  m=>m.SplashComponent
  )
  
  },

{
path:'**',

redirectTo:'login'

}



];