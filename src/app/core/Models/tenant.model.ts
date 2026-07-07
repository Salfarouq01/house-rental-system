export interface Tenant {

    id: number;
  
    firstName: string;
  
    lastName: string;
  
    gender: 'Male' | 'Female';
  
    phone: string;
  
    email: string;
  
    nationalId: string;
  
    occupation: string;
  
    emergencyContact: string;
  
    roomId: number;
  
    moveInDate: Date;
  
    status: 'Active' | 'Inactive';
  
  }