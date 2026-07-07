import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HouseService } from '../../../core/services/house.service';
import { RoomService } from '../../../core/services/room.service';
import { Room } from '../../../core/Models/room.model';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './room-list.html',
  styleUrl: './room-list.css'
})
export class RoomListComponent {

  private roomService = inject(RoomService);
  private router = inject(Router);
  private houseService = inject(HouseService);

  displayedColumns: string[] = [
    'roomNumber',
    'houseId',
    'floor',
    'roomType',
    'capacity',
    'occupied',
    'monthlyRent',
    'status',
    'actions'
  ];

  rooms: Room[] = [];

  constructor() {
    this.loadRooms();
  }

  getHouseName(houseId: number): string {

    const house = this.houseService.getById(houseId);
  
    return house ? house.name : 'Unknown House';
  
  }

  loadRooms(): void {
    this.rooms = this.roomService.getAll();
  }

  addRoom(): void {
    this.router.navigate(['/rooms/add']);
  }

  editRoom(id: number): void {
    this.router.navigate(['/rooms/edit', id]);
  }

  deleteRoom(id: number): void {

    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.delete(id);
      this.loadRooms();
    }

  }

}