import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PaymentService } from '../../../../core/services/payment.service';
import { RoomService } from '../../../../core/services/room.service';
import { TenantService } from '../../../../core/services/tenant.service';





@Component({

selector:'app-manager-dashboard',

standalone:true,

imports:[

CommonModule,

MatCardModule,

MatIconModule

],

templateUrl:'./manager-dashboard.html',

styleUrl:'./manager-dashboard.css'

})
export class ManagerDashboardComponent {



private tenantService = inject(TenantService);

private roomService = inject(RoomService);

private paymentService = inject(PaymentService);



totalTenants=0;

availableRooms=0;

occupiedRooms=0;

pendingPayments=0;



ngOnInit(){

this.load();

}



load(){


const tenants =
this.tenantService.getAll();


const rooms =
this.roomService.getAll();


const payments =
this.paymentService.getAll();



this.totalTenants =
tenants.length;



this.availableRooms =
rooms.filter(
r=>r.status==='Available'
).length;



this.occupiedRooms =
rooms.filter(
r=>r.status==='Occupied'
).length;



this.pendingPayments =
payments.filter(
p=>p.status==='Unpaid'
).length;


}



}