import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HouseService } from '../../../../core/services/house.service';
import { PaymentService } from '../../../../core/services/payment.service';
import { RoomService } from '../../../../core/services/room.service';






@Component({

selector:'app-owner-dashboard',

standalone:true,

imports:[

CommonModule,

MatCardModule,

MatIconModule

],

templateUrl:'./owner-dashboard.html',

styleUrl:'./owner-dashboard.css'

})
export class OwnerDashboardComponent {



private houseService = inject(HouseService);

private roomService = inject(RoomService);

private paymentService = inject(PaymentService);



myHouses = 0;

totalRooms = 0;

availableRooms = 0;

income = 0;



ngOnInit(){


this.load();


}



load(){


const houses =
this.houseService.getAll();


const rooms =
this.roomService.getAll();


const payments =
this.paymentService.getAll();



this.myHouses =
houses.length;



this.totalRooms =
rooms.length;



this.availableRooms =
rooms.filter(
r=>r.status==='Available'
).length;



this.income =
payments

.filter(
p=>p.status==='Paid'
)

.reduce(
(sum,p)=>sum+p.amount,
0
);


}


}