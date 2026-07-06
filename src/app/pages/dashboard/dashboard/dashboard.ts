import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {

  stats = [
    {
      title: 'Total Houses',
      value: 25,
      icon: 'home',
      color: '#1976d2'
    },
    {
      title: 'Total Rooms',
      value: 120,
      icon: 'meeting_room',
      color: '#388e3c'
    },
    {
      title: 'Available Rooms',
      value: 40,
      icon: 'check_circle',
      color: '#fbc02d'
    },
    {
      title: 'Occupied Rooms',
      value: 80,
      icon: 'block',
      color: '#d32f2f'
    },
    {
      title: 'Tenants',
      value: 60,
      icon: 'people',
      color: '#7b1fa2'
    },
    {
      title: 'Monthly Income',
      value: 'TZS 5,000,000',
      icon: 'payments',
      color: '#0288d1'
    }
  ];
}