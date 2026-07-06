import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Router } from '@angular/router';
import { HouseService } from '../../../core/services/house.service';
import { House } from '../../../core/models/house.model';

@Component({
  selector: 'app-house-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './house-list.html',
  styleUrl: './house-list.css'
})
export class HouseListComponent {

  private houseService = inject(HouseService);
  private router = inject(Router);

  displayedColumns: string[] = [
    'id', 'name', 'location', 'rooms', 'rent', 'actions'
  ];

  houses: House[] = this.houseService.getAll();

  addHouse() {
    this.router.navigate(['/houses/add']);
  }

  editHouse(id: number) {
    this.router.navigate(['/houses/edit', id]);
  }

  deleteHouse(id: number) {
    this.houseService.delete(id);
    this.houses = this.houseService.getAll();
  }
}