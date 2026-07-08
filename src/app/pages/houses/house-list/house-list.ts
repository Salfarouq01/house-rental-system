import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';


import {
MatTableModule
}
from '@angular/material/table';


import {
MatButtonModule
}
from '@angular/material/button';


import {
MatIconModule
}
from '@angular/material/icon';


import {
MatSnackBar,
MatSnackBarModule
}
from '@angular/material/snack-bar';


import {
Router
}
from '@angular/router';


import {
HouseService
}
from '../../../core/services/house.service';


import {
House
}
from '../../../core/Models/house.model';



@Component({

selector:'app-house-list',

standalone:true,

imports:[

CommonModule,

MatTableModule,

MatButtonModule,

MatIconModule,

MatSnackBarModule

],

templateUrl:'./house-list.html',

styleUrl:'./house-list.css'

})


export class HouseListComponent {



private service=inject(HouseService);

private router=inject(Router);

private snack=inject(MatSnackBar);




displayedColumns=[

'id',

'name',

'location',

'rooms',

'rent',

'actions'

];



houses:House[]=[];




ngOnInit(){

this.load();

}





load(){

this.houses=
this.service.getAll();

}




addHouse(){

this.router.navigate([
'/houses/add'
]);

}




editHouse(id:number){

this.router.navigate([
'/houses/edit',
id
]);

}





deleteHouse(id:number){



const confirmDelete=
confirm(
'Delete this house?'
);



if(!confirmDelete)
return;



this.service.delete(id);



this.load();



this.snack.open(
'House deleted',
'OK',
{
duration:3000
}
);


}



}