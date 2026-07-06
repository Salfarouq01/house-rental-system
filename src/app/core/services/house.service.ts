import { Injectable } from '@angular/core';
import { House } from '../Models/house.model';


@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private houses: House[] = [
    {
      id: 1,
      name: 'Sunrise Apartments',
      location: 'Dar es Salaam',
      description: 'Modern apartments near city center',
      rooms: 10,
      rentPerMonth: 500000
    },
    {
      id: 2,
      name: 'Ocean View Villa',
      location: 'Oysterbay',
      description: 'Luxury villa with ocean view',
      rooms: 5,
      rentPerMonth: 1200000
    }
  ];

  getAll(): House[] {
    return this.houses;
  }

  add(house: House) {
    house.id = this.houses.length + 1;
    this.houses.push(house);
  }

  update(updated: House) {
    const index = this.houses.findIndex(h => h.id === updated.id);
    if (index !== -1) {
      this.houses[index] = updated;
    }
  }

  delete(id: number) {
    this.houses = this.houses.filter(h => h.id !== id);
  }

  getById(id: number): House | undefined {
    return this.houses.find(h => h.id === id);
  }
}