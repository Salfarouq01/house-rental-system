import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../services/auth.service';
import { User } from '../../Models/user.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class LayoutComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  user: User | null = this.authService.getUser();

  menus = [

    {
      title: 'Dashboard',
      icon: 'dashboard',
      path: '/admin/dashboard',
      permission: 'VIEW_DASHBOARD'
    },

    {
      title: 'Houses',
      icon: 'home',
      path: '/houses',
      permission: 'MANAGE_HOUSES'
    },

    {
      title: 'Rooms',
      icon: 'meeting_room',
      path: '/rooms',
      permission: 'MANAGE_ROOMS'
    },

    {
      title: 'Tenants',
      icon: 'people',
      path: '/tenants',
      permission: 'MANAGE_TENANTS'
    },

    {
      title: 'Payments',
      icon: 'payments',
      path: '/payments',
      permission: 'MANAGE_PAYMENTS'
    },

    {
      title: 'Reports',
      icon: 'assessment',
      path: '/reports',
      permission: 'VIEW_REPORTS'
    },

    {
      title: 'Users',
      icon: 'manage_accounts',
      path: '/admin/users',
      permission: 'MANAGE_USERS'
    },

    {
      title: 'Roles',
      icon: 'security',
      path: '/admin/roles',
      permission: 'MANAGE_ROLES'
    }

  ];

  hasPermission(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}