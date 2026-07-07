export interface Room {
    id: number;
    roomNumber: string;
    houseId: number;
    floor: number;
    roomType: string;
    capacity: number;
    occupied: number;
    monthlyRent: number;
    status: 'Available' | 'Occupied' | 'Maintenance';
    description: string;
  }