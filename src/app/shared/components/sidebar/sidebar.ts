import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/Models/user.model';

interface MenuItem {

  title: string;

  icon: string;

  route: string;

}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {

  @Input() collapsed = false;

  private authService = inject(AuthService);

  menus: MenuItem[] = [];

  constructor() {

    this.loadMenus();

  }

  private loadMenus(): void {

    const user = this.authService.getUser();

    if (!user) return;

    switch (user.role) {

      case UserRole.ADMIN:

        this.menus = [

          {
            title: 'Dashboard',
            icon: 'dashboard',
            route: '/admin/dashboard'
          },

          {
            title: 'Houses',
            icon: 'home',
            route: '/houses'
          },

          {
            title: 'Rooms',
            icon: 'meeting_room',
            route: '/rooms'
          },

          {
            title: 'Tenants',
            icon: 'people',
            route: '/tenants'
          },

          {
            title: 'Payments',
            icon: 'payments',
            route: '/payments'
          },

          {
            title: 'Reports',
            icon: 'assessment',
            route: '/reports'
          },

          {
            title: 'Users',
            icon: 'manage_accounts',
            route: '/admin/users'
          },

          {
            title: 'Roles',
            icon: 'security',
            route: '/admin/roles'
          }

        ];

        break;

      case UserRole.OWNER:

        this.menus = [

          {
            title: 'Dashboard',
            icon: 'dashboard',
            route: '/owner/dashboard'
          },

          {
            title: 'Houses',
            icon: 'home',
            route: '/houses'
          },

          {
            title: 'Rooms',
            icon: 'meeting_room',
            route: '/rooms'
          },

          {
            title: 'Reports',
            icon: 'assessment',
            route: '/reports'
          }

        ];

        break;

      case UserRole.MANAGER:

        this.menus = [

          {
            title: 'Dashboard',
            icon: 'dashboard',
            route: '/manager/dashboard'
          },

          {
            title: 'Rooms',
            icon: 'meeting_room',
            route: '/rooms'
          },

          {
            title: 'Tenants',
            icon: 'people',
            route: '/tenants'
          },

          {
            title: 'Payments',
            icon: 'payments',
            route: '/payments'
          }

        ];

        break;

      case UserRole.ACCOUNTANT:

        this.menus = [

          {
            title: 'Dashboard',
            icon: 'dashboard',
            route: '/accountant/dashboard'
          },

          {
            title: 'Payments',
            icon: 'payments',
            route: '/payments'
          },

          {
            title: 'Reports',
            icon: 'assessment',
            route: '/reports'
          }

        ];

        break;

      case UserRole.TENANT:

        this.menus = [

          {
            title: 'Dashboard',
            icon: 'dashboard',
            route: '/tenant/dashboard'
          },

          {
            title: 'My Room',
            icon: 'meeting_room',
            route: '/tenant/room'
          },

          {
            title: 'Payments',
            icon: 'payments',
            route: '/tenant/payments'
          },

          {
            title: 'Profile',
            icon: 'person',
            route: '/tenant/profile'
          }

        ];

        break;

    }

  }

}