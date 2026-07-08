import { Injectable } from '@angular/core';


import {
User,
UserRole
}
from '../Models/user.model';


import {
Permission
}
from '../Models/permission.model';



@Injectable({
providedIn:'root'
})


export class AuthService {



private users:User[]=[


{
id:1,

fullName:'System Administrator',

email:'admin@gmail.com',

username:'admin',

password:'1234',

phone:'0711111111',

role:UserRole.ADMIN,

status:'Active',

permissions:[

Permission.VIEW_DASHBOARD,

Permission.MANAGE_HOUSES,

Permission.MANAGE_ROOMS,

Permission.MANAGE_TENANTS,

Permission.MANAGE_PAYMENTS,

Permission.VIEW_REPORTS,

Permission.MANAGE_USERS,

Permission.MANAGE_ROLES

],

createdAt:new Date().toISOString()

},



{
id:2,

fullName:'House Owner',

email:'owner@gmail.com',

username:'owner',

password:'1234',

phone:'0722222222',

role:UserRole.OWNER,

status:'Active',

permissions:[

Permission.VIEW_DASHBOARD,

Permission.MANAGE_HOUSES,

Permission.MANAGE_ROOMS,

Permission.VIEW_REPORTS

],

createdAt:new Date().toISOString()

},



{
id:3,

fullName:'Property Manager',

email:'manager@gmail.com',

username:'manager',

password:'1234',

phone:'0733333333',

role:UserRole.MANAGER,

status:'Active',

permissions:[

Permission.VIEW_DASHBOARD,

Permission.MANAGE_HOUSES,

Permission.MANAGE_ROOMS,

Permission.MANAGE_TENANTS,

Permission.MANAGE_PAYMENTS

],

createdAt:new Date().toISOString()

},



{
id:4,

fullName:'Accountant',

email:'accountant@gmail.com',

username:'accountant',

password:'1234',

phone:'0744444444',

role:UserRole.ACCOUNTANT,

status:'Active',

permissions:[

Permission.VIEW_DASHBOARD,

Permission.MANAGE_PAYMENTS,

Permission.VIEW_REPORTS

],

createdAt:new Date().toISOString()

},



{
id:5,

fullName:'Tenant',

email:'tenant@gmail.com',

username:'tenant',

password:'1234',

phone:'0755555555',

role:UserRole.TENANT,

status:'Active',

permissions:[

Permission.VIEW_DASHBOARD

],

createdAt:new Date().toISOString()

}


];





login(
email:string,
password:string
):boolean{


const user=this.users.find(
u=>
u.email===email &&
u.password===password
);



if(!user){

return false;

}



localStorage.setItem(
'user',
JSON.stringify(user)
);


return true;


}





getUser():User|null{


const user=
localStorage.getItem('user');


return user
?
JSON.parse(user)
:
null;


}




isLoggedIn():boolean{

return this.getUser()!=null;

}




logout(){

localStorage.removeItem('user');

}





hasRole(
role:UserRole
):boolean{


return this.getUser()?.role===role;


}




hasPermission(
permission:Permission
):boolean{


const user=this.getUser();


if(!user){

return false;

}


return user.permissions.includes(permission);


}



}