import { Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login';
import { LayoutComponent } from './core/layout/layout/layout';
import { authGuard } from './core/guards/auth-guard';


export const routes: Routes = [

  // Default
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },


  // Login
  {
    path: 'login',
    component: LoginComponent
  },


  // Protected Application Layout
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],

    children: [

      // Dashboard
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard/dashboard')
          .then(m => m.DashboardComponent)
      },


      // Houses
      {
        path: 'houses',
        loadComponent: () =>
          import('./pages/houses/house-list/house-list')
          .then(m => m.HouseListComponent)
      },

      {
        path: 'houses/add',
        loadComponent: () =>
          import('./pages/houses/house-form/house-form')
          .then(m => m.HouseForm)
      },

      {
        path: 'houses/edit/:id',
        loadComponent: () =>
          import('./pages/houses/house-form/house-form')
          .then(m => m.HouseForm)
      },


      // Rooms
      {
        path: 'rooms',
        loadComponent: () =>
          import('./pages/rooms/room-list/room-list')
          .then(m => m.RoomListComponent)
      },

      {
        path: 'rooms/add',
        loadComponent: () =>
          import('./pages/rooms/room-form/room-form')
          .then(m => m.RoomFormComponent)
      },

      {
        path: 'rooms/edit/:id',
        loadComponent: () =>
          import('./pages/rooms/room-form/room-form')
          .then(m => m.RoomFormComponent)
      },


      // Tenants
      {
        path: 'tenants',
        loadComponent: () =>
          import('./pages/tenants/tenant-list/tenant-list')
          .then(m => m.TenantListComponent)
      },

      {
        path: 'tenants/add',
        loadComponent: () =>
          import('./pages/tenants/tenant-form/tenant-form')
          .then(m => m.TenantFormComponent)
      },

      {
        path: 'tenants/edit/:id',
        loadComponent: () =>
          import('./pages/tenants/tenant-form/tenant-form')
          .then(m => m.TenantFormComponent)
      },

      {
        path: 'tenants/profile/:id',
        loadComponent: () =>
          import('./pages/tenants/tenant-profile/tenant-profile')
          .then(m => m.TenantProfileComponent)
      },


      // Payments
      {
        path: 'payments',
        loadComponent: () =>
          import('./pages/payments/payment-list/payment-list')
          .then(m => m.PaymentListComponent)
      },

      {
        path: 'payments/add',
        loadComponent: () =>
          import('./pages/payments/payment-form/payment-form')
          .then(m => m.PaymentFormComponent)
      },

      {
        path: 'payments/edit/:id',
        loadComponent: () =>
          import('./pages/payments/payment-form/payment-form')
          .then(m => m.PaymentFormComponent)
      },

      {
        path: 'payments/details/:id',
        loadComponent: () =>
          import('./pages/payments/payment-details/payment-details')
          .then(m => m.PaymentDetails)
      }

    ]
  },


  // Not Found
  {
    path: '**',
    redirectTo: 'login'
  }

];