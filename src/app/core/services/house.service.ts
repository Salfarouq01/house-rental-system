import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { House } from '../Models/house.model';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private readonly STORAGE_KEY = 'houses';
  
  // Reactive state management
  private housesSubject$ = new BehaviorSubject<House[]>([]);
  public houses$: Observable<House[]> = this.housesSubject$.asObservable();

  private defaultHouses: House[] = [
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

  constructor() {
    this.loadInitialData();
  }

  /**
   * Loads data from localStorage or initializes with default values
   */
  private loadInitialData(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    
    if (data) {
      try {
        const parsedHouses: House[] = JSON.parse(data);
        this.housesSubject$.next(parsedHouses);
      } catch (error) {
        console.error('Error parsing houses from localStorage, loading defaults.', error);
        this.setHouses(this.defaultHouses);
      }
    } else {
      this.setHouses(this.defaultHouses);
    }
  }

  /**
   * Helper method to update state and sync with localStorage
   */
  private setHouses(houses: House[]): void {
    this.housesSubject$.next(houses);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(houses));
  }

  /**
   * Gets the current snapshot of all houses
   */
  private get currentHouses(): House[] {
    return this.housesSubject$.getValue();
  }

  /**
   * Returns a synchronous copy of all houses
   */
  public getAll(): House[] {
    return [...this.currentHouses];
  }

  /**
   * Finds a house by its ID
   */
  public getById(id: number): House | undefined {
    return this.currentHouses.find(house => house.id === id);
  }

  /**
   * Adds a new house with a auto-generated ID
   */
  public add(house: Omit<House, 'id'>): void {
    const current = this.currentHouses;
    const nextId = current.length ? Math.max(...current.map(h => h.id)) + 1 : 1;
    
    const newHouse: House = { ...house, id: nextId };
    this.setHouses([...current, newHouse]);
  }

  /**
   * Updates an existing house
   */
  public update(updatedHouse: House): void {
    const current = this.currentHouses;
    const index = current.findIndex(h => h.id === updatedHouse.id);

    if (index !== -1) {
      const updatedList = [...current];
      updatedList[index] = updatedHouse;
      this.setHouses(updatedList);
    }
  }

  /**
   * Deletes a house by its ID
   */
  public delete(id: number): void {
    const filteredHouses = this.currentHouses.filter(h => h.id !== id);
    this.setHouses(filteredHouses);
  }

  /**
   * Updates specific room count for a house
   */
  public updateRoomCount(houseId: number, count: number): void {
    const current = this.currentHouses;
    const index = current.findIndex(h => h.id === houseId);

    if (index !== -1) {
      const updatedList = [...current];
      updatedList[index] = { ...updatedList[index], rooms: count };
      this.setHouses(updatedList);
    }
  }
}