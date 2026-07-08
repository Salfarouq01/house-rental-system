import { Injectable } from '@angular/core';
import { User, UserRole } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [

    {
      id: 1,
      fullName: 'System Administrator',
      email: 'admin@gmail.com',
      username: 'admin',
      password: '1234',
      phone: '0711111111',
      role: UserRole.ADMIN,
      status: 'Active',
      createdAt: new Date(),
      permissions: [
        'VIEW_DASHBOARD',
        'MANAGE_USERS',
        'MANAGE_ROLES',
        'MANAGE_HOUSES',
        'MANAGE_ROOMS',
        'MANAGE_TENANTS',
        'MANAGE_PAYMENTS',
        'VIEW_REPORTS'
      ]
    },

    {
      id: 2,
      fullName: 'House Owner',
      email: 'owner@gmail.com',
      username: 'owner',
      password: '1234',
      phone: '0722222222',
      role: UserRole.OWNER,
      status: 'Active',
      createdAt: new Date(),
      permissions: [
        'VIEW_DASHBOARD',
        'MANAGE_HOUSES',
        'MANAGE_ROOMS',
        'VIEW_REPORTS'
      ]
    },

    {
      id: 3,
      fullName: 'Property Manager',
      email: 'manager@gmail.com',
      username: 'manager',
      password: '1234',
      phone: '0733333333',
      role: UserRole.MANAGER,
      status: 'Active',
      createdAt: new Date(),
      permissions: [
        'VIEW_DASHBOARD',
        'MANAGE_ROOMS',
        'MANAGE_TENANTS',
        'MANAGE_PAYMENTS'
      ]
    },

    {
      id: 4,
      fullName: 'Accountant',
      email: 'accountant@gmail.com',
      username: 'accountant',
      password: '1234',
      phone: '0744444444',
      role: UserRole.ACCOUNTANT,
      status: 'Active',
      createdAt: new Date(),
      permissions: [
        'VIEW_DASHBOARD',
        'MANAGE_PAYMENTS',
        'VIEW_REPORTS'
      ]
    },

    {
      id: 5,
      fullName: 'Tenant User',
      email: 'tenant@gmail.com',
      username: 'tenant',
      password: '1234',
      phone: '0755555555',
      role: UserRole.TENANT,
      status: 'Active',
      createdAt: new Date(),
      permissions: [
        'VIEW_DASHBOARD'
      ]
    }

  ];

  login(email: string, password: string): boolean {

    const user = this.users.find(
      u =>
        u.email === email &&
        u.password === password &&
        u.status === 'Active'
    );

    if (!user) {
      return false;
    }

    user.lastLogin = new Date();

    localStorage.setItem('user', JSON.stringify(user));

    return true;
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  getUser(): User | null {

    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;

  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  hasRole(role: UserRole): boolean {

    const user = this.getUser();

    return user?.role === role;

  }

  hasPermission(permission: string): boolean {

    const user = this.getUser();

    if (!user) {
      return false;
    }

    return user.permissions.includes(permission);

  }

}