import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';


import {
  AuthService
} from '../services/auth.service';


import {
  Permission
} from '../Models/permission.model';



export const permissionGuard: CanActivateFn = (route) => {


  const auth = inject(AuthService);

  const router = inject(Router);



  const permission = 
    route.data['permission'] as Permission;



  const user =
    auth.getUser();



  console.log(
    "Required Permission:",
    permission
  );


  console.log(
    "Current User:",
    user
  );


  console.log(
    "User Permissions:",
    user?.permissions
  );



  if (!user) {

    return router.createUrlTree([
      '/login'
    ]);

  }



  if (
    user.permissions.includes(permission)
  ) {

    return true;

  }



  return router.createUrlTree([
    '/unauthorized'
  ]);


};