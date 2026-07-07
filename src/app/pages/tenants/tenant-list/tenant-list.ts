import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { TenantService } from '../../../core/services/tenant.service';
import { RoomService } from '../../../core/services/room.service';
import { HouseService } from '../../../core/services/house.service';
import { Room } from '../../../core/Models/room.model';
import { Tenant } from '../../../core/Models/tenant.model';


@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './tenant-list.html',
  styleUrl: './tenant-list.css'
})
export class TenantListComponent {

  private tenantService = inject(TenantService);
  private roomService = inject(RoomService);
  private houseService = inject(HouseService);
  private router = inject(Router);

  tenants: Tenant[] = [];

  displayedColumns: string[] = [
    'name',
    'gender',
    'phone',
    'room',
    'house',
    'status',
    'actions'
  ];

  constructor() {
    this.loadTenants();
  }

  loadTenants(): void {
    this.tenants = this.tenantService.getAll();
  }

  getRoom(roomId: number): Room | undefined {
    return this.roomService.getById(roomId);
  }

  getHouseName(roomId: number): string {

    const room = this.roomService.getById(roomId);

    if (!room) {
      return '-';
    }

    const house = this.houseService.getById(room.houseId);

    return house ? house.name : '-';

  }

  addTenant(): void {
    this.router.navigate(['/tenants/add']);
  }

  editTenant(id: number): void {
    this.router.navigate(['/tenants/edit', id]);
  }

  deleteTenant(id: number): void {

    if (!confirm('Delete this tenant?')) {
      return;
    }

    const tenant = this.tenantService.getById(id);

    if (tenant) {

      const room = this.roomService.getById(tenant.roomId);

      if (room) {

        room.occupied--;

        if (room.occupied < 0) {
          room.occupied = 0;
        }

        if (room.occupied < room.capacity) {
          room.status = 'Available';
        }

        this.roomService.update(room);

      }

    }

    this.tenantService.delete(id);

    this.loadTenants();

  }

}