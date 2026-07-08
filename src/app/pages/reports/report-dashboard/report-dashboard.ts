import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { HouseService } from '../../../core/services/house.service';
import { RoomService } from '../../../core/services/room.service';
import { TenantService } from '../../../core/services/tenant.service';
import { PaymentService } from '../../../core/services/payment.service';


@Component({
  selector: 'app-report-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule
  ],

  templateUrl: './report-dashboard.html',
  styleUrl: './report-dashboard.css'
})
export class ReportDashboardComponent {


  private houseService = inject(HouseService);

  private roomService = inject(RoomService);

  private tenantService = inject(TenantService);

  private paymentService = inject(PaymentService);



  totalHouses = 0;

  totalRooms = 0;

  occupiedRooms = 0;

  availableRooms = 0;

  totalTenants = 0;

  totalIncome = 0;



  constructor(){

    this.loadReports();

  }



  loadReports(){


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



    this.occupiedRooms =
      rooms.filter(
        r => r.status === 'Occupied'
      ).length;



    this.availableRooms =
      rooms.filter(
        r => r.status === 'Available'
      ).length;



    this.totalTenants =
      tenants.length;



    this.totalIncome =
      payments
      .filter(
        p => p.status === 'Paid'
      )
      .reduce(
        (total,p)=>
        total+p.amount,
        0
      );


  }


}