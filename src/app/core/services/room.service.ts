import { Injectable } from '@angular/core';
import { Room } from '../Models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private rooms: Room[] = [
    {
      id: 1,
      roomNumber: 'A101',
      houseId: 1,
      floor: 1,
      roomType: 'Single',
      capacity: 1,
      occupied: 0,
      monthlyRent: 250000,
      status: 'Available',
      description: 'Single self-contained room'
    },
    {
      id: 2,
      roomNumber: 'B201',
      houseId: 1,
      floor: 2,
      roomType: 'Double',
      capacity: 2,
      occupied: 1,
      monthlyRent: 450000,
      status: 'Available',
      description: 'Double room with balcony'
    }
  ];

  getAll(): Room[] {
    return this.rooms;
  }

  getById(id: number): Room | undefined {
    return this.rooms.find(room => room.id === id);
  }

  add(room: Room): void {
    const id = this.rooms.length
      ? Math.max(...this.rooms.map(r => r.id)) + 1
      : 1;

    this.rooms.push({
      ...room,
      id
    });

  }
  

  update(room: Room): void {
    const index = this.rooms.findIndex(r => r.id === room.id);

    if (index !== -1) {
      this.rooms[index] = room;
    }
  }

  delete(id: number): void {
    this.rooms = this.rooms.filter(room => room.id !== id);
  }
}