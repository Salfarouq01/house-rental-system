import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { MatIconModule } from '@angular/material/icon';
import { PaymentService } from '../../../../core/services/payment.service';





@Component({

selector:'app-accountant-dashboard',

standalone:true,

imports:[

CommonModule,

MatCardModule,

MatIconModule

],

templateUrl:'./accountant-dashboard.html',

styleUrl:'./accountant-dashboard.css'

})
export class AccountantDashboardComponent {



private paymentService =
inject(PaymentService);



paidAmount=0;

pendingAmount=0;

transactions=0;



ngOnInit(){

this.load();

}



load(){


const payments =
this.paymentService.getAll();



this.transactions =
payments.length;



this.paidAmount =
payments

.filter(
p=>p.status==='Paid'
)

.reduce(
(sum,p)=>sum+p.amount,
0
);



this.pendingAmount =
payments

.filter(
p=>p.status==='Unpaid'
)

.reduce(
(sum,p)=>sum+p.amount,
0
);


}



}