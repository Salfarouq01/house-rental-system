import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/Models/user.model';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  loading = false;
  errorMessage = '';

  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(4)
      ]
    ]
  });

  onLogin(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? '';

    // Simulate server request
    setTimeout(() => {

      const success = this.authService.login(email, password);

      if (!success) {
        this.loading = false;
        this.errorMessage = 'Invalid email or password.';
        return;
      }

      const user = this.authService.getUser();

      let destination = '/admin/dashboard';

      switch (user?.role) {

        case UserRole.ADMIN:
          destination = '/admin/dashboard';
          break;

        case UserRole.OWNER:
          destination = '/owner/dashboard';
          break;

        case UserRole.MANAGER:
          destination = '/manager/dashboard';
          break;

        case UserRole.ACCOUNTANT:
          destination = '/accountant/dashboard';
          break;

        case UserRole.TENANT:
          destination = '/tenant/dashboard';
          break;

        default:
          destination = '/login';
      }

      // Save destination for splash screen
      sessionStorage.setItem('splashDestination', destination);

      this.loading = false;

      // Go to splash screen
      this.router.navigate(['/splash']);

    }, 1000);
  }
}