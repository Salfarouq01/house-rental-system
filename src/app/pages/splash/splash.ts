import { Component, OnInit, inject } from '@angular/core';

import {
  Router
} from '@angular/router';



@Component({

selector:'app-splash',

standalone:true,

imports:[],

templateUrl:'./splash.html',

styleUrl:'./splash.css'

})


export class SplashComponent implements OnInit {


private router = inject(Router);



ngOnInit(){


setTimeout(()=>{


this.router.navigate([
'/admin/dashboard'
]);


},5000);



}


}