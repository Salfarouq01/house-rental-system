import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { TenantService } from '../../../core/services/tenant.service';
import { RoomService } from '../../../core/services/room.service';
import { Room } from '../../../core/Models/room.model';
import { Tenant } from '../../../core/Models/tenant.model';


@Component({
  selector: 'app-tenant-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './tenant-form.html',
  styleUrl: './tenant-form.css'
})
export class TenantFormComponent {

  private fb = inject(FormBuilder);
  private tenantService = inject(TenantService);
  private roomService = inject(RoomService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  rooms: Room[] = [];

  isEdit = false;
  tenantId = 0;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    nationalId: ['', Validators.required],
    occupation: [''],
    emergencyContact: [''],
    roomId: [null as number | null, Validators.required],
    moveInDate: ['', Validators.required],
    status: ['Active', Validators.required]
  });

  constructor() {

    this.loadRooms();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEdit = true;
      this.tenantId = Number(id);

      const tenant = this.tenantService.getById(this.tenantId);

      if (tenant) {
        this.form.patchValue({
          firstName: tenant.firstName,
          lastName: tenant.lastName,
          gender: tenant.gender,
          phone: tenant.phone,
          email: tenant.email,
          nationalId: tenant.nationalId,
          occupation: tenant.occupation,
          emergencyContact: tenant.emergencyContact,
          roomId: tenant.roomId,
          moveInDate: tenant.moveInDate instanceof Date
            ? tenant.moveInDate.toISOString().substring(0, 10)
            : tenant.moveInDate as any,
          status: tenant.status
        });
      }

    }

  }

  private loadRooms(): void {
    this.rooms = this.roomService
      .getAll()
      .filter(room => room.occupied < room.capacity);
  }

  save(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const tenant: Tenant = {
      id: this.isEdit ? this.tenantId : 0,
      firstName: value.firstName ?? '',
      lastName: value.lastName ?? '',
      gender: value.gender as 'Male' | 'Female',
      phone: value.phone ?? '',
      email: value.email ?? '',
      nationalId: value.nationalId ?? '',
      occupation: value.occupation ?? '',
      emergencyContact: value.emergencyContact ?? '',
      roomId: Number(value.roomId),
      moveInDate: new Date(value.moveInDate ?? ''),
      status: value.status as 'Active' | 'Inactive'
    };

    const room = this.roomService.getById(tenant.roomId);

    if (!room) {
      alert('Selected room was not found.');
      return;
    }

    if (!this.isEdit && room.occupied >= room.capacity) {
      alert('This room is already full.');
      return;
    }

    if (this.isEdit) {

      this.tenantService.update(tenant);

    } else {

      this.tenantService.add(tenant);

      room.occupied++;

      room.status =
        room.occupied >= room.capacity
          ? 'Occupied'
          : 'Available';

      this.roomService.update(room);

    }

    this.router.navigate(['/tenants']);

  }

  cancel(): void {
    this.router.navigate(['/tenants']);
  }

}