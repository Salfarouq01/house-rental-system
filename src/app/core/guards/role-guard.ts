import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  AuthService
} from '../services/auth.service';

import {
  UserRole
} from '../Models/user.model';



export const roleGuard: CanActivateFn = (route) => {


  const auth = inject(AuthService);

  const router = inject(Router);



  const user = auth.getUser();



  if (!user) {

    return router.createUrlTree([
      '/login'
    ]);

  }



  const roles = route.data['roles'] as UserRole[];



  if (!roles || roles.length === 0) {

    return true;

  }



  if (roles.includes(user.role)) {

    return true;

  }



  return router.createUrlTree([
    '/unauthorized'
  ]);


};