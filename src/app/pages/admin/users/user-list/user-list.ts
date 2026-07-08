import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';

import { User, UserRole } from '../../../../core/Models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
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
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserListComponent {

  constructor(private router: Router) {}

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'role',
    'status',
    'actions'
  ];

  search = '';

  selectedRole = '';

  roles = Object.values(UserRole);

  users: User[] = [

    {
      id: 1,
      fullName: 'System Administrator',
      email: 'admin@gmail.com',
      username: 'admin',
      password: '1234',
      phone: '0712345678',
      role: UserRole.ADMIN,
      permissions: [],
      status: 'Active',
      createdAt: new Date()
    },

    {
      id: 2,
      fullName: 'Ali Mohamed',
      email: 'owner@gmail.com',
      username: 'owner',
      password: '1234',
      phone: '0744556677',
      role: UserRole.OWNER,
      permissions: [],
      status: 'Active',
      createdAt: new Date()
    },

    {
      id: 3,
      fullName: 'Sara Hassan',
      email: 'manager@gmail.com',
      username: 'manager',
      password: '1234',
      phone: '0755112233',
      role: UserRole.MANAGER,
      permissions: [],
      status: 'Active',
      createdAt: new Date()
    },

    {
      id: 4,
      fullName: 'Ahmed Omar',
      email: 'accountant@gmail.com',
      username: 'accountant',
      password: '1234',
      phone: '0788776655',
      role: UserRole.ACCOUNTANT,
      permissions: [],
      status: 'Inactive',
      createdAt: new Date()
    }

  ];

  get totalUsers(): number {
    return this.users.length;
  }

  get activeUsers(): number {
    return this.users.filter(
      user => user.status === 'Active'
    ).length;
  }

  get inactiveUsers(): number {
    return this.users.filter(
      user => user.status === 'Inactive'
    ).length;
  }

  get filteredUsers(): User[] {

    return this.users.filter(user => {

      const matchesRole =
        this.selectedRole === '' ||
        user.role === this.selectedRole;

      const searchText = this.search.toLowerCase();

      const matchesSearch =
        user.fullName.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText);

      return matchesRole && matchesSearch;

    });

  }

  addUser(): void {
    this.router.navigate(['/admin/users/add']);
  }

  editUser(id: number): void {
    this.router.navigate(['/admin/users/edit', id]);
  }

  permissions(id: number): void {
    this.router.navigate(['/admin/users/permissions', id]);
  }

  deleteUser(id: number): void {

    if (confirm('Delete this user?')) {

      this.users = this.users.filter(
        user => user.id !== id
      );

    }

  }

}