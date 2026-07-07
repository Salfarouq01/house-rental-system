import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TenantService } from '../../../core/services/tenant.service';
import { RoomService } from '../../../core/services/room.service';
import { HouseService } from '../../../core/services/house.service';
import { House } from '../../../core/Models/house.model';
import { Room } from '../../../core/Models/room.model';
import { Tenant } from '../../../core/Models/tenant.model';




@Component({
  selector: 'app-tenant-profile',
  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './tenant-profile.html',
  styleUrl: './tenant-profile.css'
})
export class TenantProfileComponent {


  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private tenantService = inject(TenantService);
  private roomService = inject(RoomService);
  private houseService = inject(HouseService);


  tenant?: Tenant;

  room?: Room;

  house?: House;



  constructor(){


    const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );


    this.tenant =
      this.tenantService.getById(id);



    if(this.tenant){


      this.room =
        this.roomService.getById(
          this.tenant.roomId
        );


      if(this.room){

        this.house =
          this.houseService.getById(
            this.room.houseId
          );

      }

    }


  }



  back(){

    this.router.navigate(['/tenants']);

  }



  edit(){

    if(this.tenant){

      this.router.navigate([
        '/tenants/edit',
        this.tenant.id
      ]);

    }

  }


}