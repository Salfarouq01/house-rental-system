import { Permission } from './permission.model';


export enum UserRole {

  ADMIN = 'ADMIN',

  OWNER = 'OWNER',

  MANAGER = 'MANAGER',

  ACCOUNTANT = 'ACCOUNTANT',

  TENANT = 'TENANT'

}



export interface User {


id:number;


fullName:string;


email:string;


username:string;


password:string;


phone:string;


role:UserRole;


status:'Active'|'Inactive';


permissions: Permission[];


createdAt:string;


lastLogin?:string;


}