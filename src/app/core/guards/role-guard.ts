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

  console.log(
  "Logged User:",
  user
  );
  
  console.log(
  "User Role:",
  user?.role
  );
  
  
  const roles = route.data['roles'] as UserRole[];
  
  
  console.log(
  "Allowed Roles:",
  roles
  );

  if (!user) {

    return router.createUrlTree([
      '/login'
    ]);

  }





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