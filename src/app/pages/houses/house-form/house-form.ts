import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';


import {
  MatCardModule
} from '@angular/material/card';


import {
  MatInputModule
} from '@angular/material/input';


import {
  MatButtonModule
} from '@angular/material/button';


import {
  MatIconModule
} from '@angular/material/icon';


import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';



import { HouseService }
from '../../../core/services/house.service';



@Component({

selector:'app-house-form',

standalone:true,

imports:[

CommonModule,

ReactiveFormsModule,

MatCardModule,

MatInputModule,

MatButtonModule,

MatIconModule,

MatSnackBarModule

],

templateUrl:'./house-form.html',

styleUrl:'./house-form.css'

})


export class HouseForm {



private fb=inject(FormBuilder);

private houseService=inject(HouseService);

private router=inject(Router);

private route=inject(ActivatedRoute);

private snack=inject(MatSnackBar);




isEdit=false;

houseId:number|null=null;




form=this.fb.group({

name:[
'',
Validators.required
],


location:[
'',
Validators.required
],


description:[
'',
Validators.required
],


rooms:[
0,
[
Validators.required,
Validators.min(1)
]
],



rentPerMonth:[
0,
[
Validators.required,
Validators.min(0)
]
]

});






constructor(){


const id =
this.route.snapshot.paramMap.get('id');



if(id){


this.isEdit=true;


this.houseId=
Number(id);



const house=
this.houseService.getById(
this.houseId
);



if(house){

this.form.patchValue(house);

}


}


}







submit(){


if(this.form.invalid){

this.snack.open(
'Please fill all required fields',
'Close',
{
duration:3000
}
);


return;

}



const data =
this.form.value;



if(this.isEdit && this.houseId){


this.houseService.update({

id:this.houseId,

...data

} as any);



this.snack.open(
'House updated successfully',
'OK',
{
duration:3000
}
);



}
else{


this.houseService.add({

id:Date.now(),

...data

} as any);



this.snack.open(
'House added successfully',
'OK',
{
duration:3000
}
);


}




this.router.navigate([
'/houses'
]);


}




cancel(){

this.router.navigate([
'/houses'
]);

}



}