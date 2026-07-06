import { Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import { LayoutComponent } from './core/layout/layout/layout';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard/dashboard')
            .then(m => m.DashboardComponent)
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  },
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
  }
];