export interface Payment {

    id: number;
  
    tenantId: number;
  
    amount: number;
  
    paymentDate: Date;
  
    paymentMethod:
      | 'Cash'
      | 'Bank'
      | 'Mobile Money'
      | 'Card';
  
    referenceNumber: string;
  
    month: string;
  
    year: number;
  
    status:
      | 'Paid'
      | 'Partial'
      | 'Unpaid';
  
    notes: string;
  
  }