import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HouseService } from '../../../../core/services/house.service';
import { PaymentService } from '../../../../core/services/payment.service';
import { RoomService } from '../../../../core/services/room.service';
import { TenantService } from '../../../../core/services/tenant.service';




@Component({

  selector: 'app-admin-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],

  templateUrl: './admin-dashboard.html',

  styleUrl: './admin-dashboard.css'

})
export class AdminDashboardComponent {



private houseService = inject(HouseService);

private roomService = inject(RoomService);

private tenantService = inject(TenantService);

private paymentService = inject(PaymentService);



totalHouses = 0;

totalRooms = 0;

availableRooms = 0;

occupiedRooms = 0;

totalTenants = 0;

totalIncome = 0;



ngOnInit(){


this.loadData();


}



loadData(){


const houses =
this.houseService.getAll();


const rooms =
this.roomService.getAll();


const tenants =
this.tenantService.getAll();


const payments =
this.paymentService.getAll();



this.totalHouses =
houses.length;



this.totalRooms =
rooms.length;



this.availableRooms =
rooms.filter(
r=>r.status === 'Available'
).length;



this.occupiedRooms =
rooms.filter(
r=>r.status === 'Occupied'
).length;



this.totalTenants =
tenants.length;



this.totalIncome =
payments

.filter(
p=>p.status === 'Paid'
)

.reduce(
(sum,p)=>sum+p.amount,
0
);


}



}