import { Injectable } from '@angular/core';



export interface User {


  id:number;

  fullName:string;

  email:string;

  phone:string;

  username:string;

  password:string;

  role:string;

  status:boolean;


}





@Injectable({

  providedIn:'root'

})


export class UserService {



private users:User[]=[



{

id:1,

fullName:'System Administrator',

email:'admin@gmail.com',

phone:'0712345678',

username:'admin',

password:'1234',

role:'ADMIN',

status:true

},





{

id:2,

fullName:'Ali Hassan',

email:'owner@gmail.com',

phone:'0711223344',

username:'owner',

password:'1234',

role:'OWNER',

status:true

},





{

id:3,

fullName:'Mohamed Manager',

email:'manager@gmail.com',

phone:'0700112233',

username:'manager',

password:'1234',

role:'MANAGER',

status:true

},





{

id:4,

fullName:'Account Officer',

email:'account@gmail.com',

phone:'0788996655',

username:'accountant',

password:'1234',

role:'ACCOUNTANT',

status:true

},





{

id:5,

fullName:'Tenant User',

email:'tenant@gmail.com',

phone:'0766554433',

username:'tenant',

password:'1234',

role:'TENANT',

status:true

}



];








getAll():User[]{


return this.users;


}







getById(id:number):User|undefined{


return this.users.find(

u=>u.id===id

);


}







add(user:User){


user.id=this.users.length+1;


this.users.push(user);


}







update(updated:User){


const index=this.users.findIndex(

u=>u.id===updated.id

);



if(index!==-1){


this.users[index]=updated;


}


}







delete(id:number){


this.users=this.users.filter(

u=>u.id!==id

);


}







login(

email:string,

password:string

):User|undefined{


return this.users.find(

u=>

u.email===email &&

u.password===password &&

u.status

);


}




}