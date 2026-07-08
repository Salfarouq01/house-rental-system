import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../Models/user.model';

export const roleGuard: CanActivateFn = (route) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  const role = route.data['role'] as UserRole;

  if (auth.hasRole(role)) {
    return true;
  }

  router.navigate(['/login']);

  return false;

};