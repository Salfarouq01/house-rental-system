import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { RoomService } from '../../../core/services/room.service';
import { HouseService } from '../../../core/services/house.service';
import { House } from '../../../core/Models/house.model';
import { Room } from '../../../core/Models/room.model';


@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './room-form.html',
  styleUrl: './room-form.css'
})
export class RoomFormComponent {

  private fb = inject(FormBuilder);
  private roomService = inject(RoomService);
  private houseService = inject(HouseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  houses: House[] = [];

  isEdit = false;
  roomId = 0;

  form = this.fb.group({
    roomNumber: ['', Validators.required],
    houseId: [0, Validators.required],
    floor: [1, Validators.required],
    roomType: ['', Validators.required],
    capacity: [1, Validators.required],
    occupied: [0],
    monthlyRent: [0, Validators.required],
    status: ['Available', Validators.required],
    description: ['']
  });

  constructor() {

    this.houses = this.houseService.getAll();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEdit = true;
      this.roomId = Number(id);

      const room = this.roomService.getById(this.roomId);

      if (room) {
        this.form.patchValue(room);
      }

    }

  }

  save() {

    if (this.form.invalid) return;

    const room = this.form.value as Room;

    if (this.isEdit) {

      room.id = this.roomId;
      this.roomService.update(room);

    } else {

      this.roomService.add(room);

    }

    this.router.navigate(['/rooms']);

  }

  cancel() {
    this.router.navigate(['/rooms']);
  }

}