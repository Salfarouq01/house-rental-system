import { Injectable } from '@angular/core';
import { Payment } from '../Models/payment.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private payments: Payment[] = [];

  getAll(): Payment[] {
    return this.payments;
  }

  getById(id: number): Payment | undefined {
    return this.payments.find(p => p.id === id);
  }

  add(payment: Payment): void {

    payment.id = this.payments.length
      ? Math.max(...this.payments.map(p => p.id)) + 1
      : 1;

    this.payments.push(payment);

  }

  update(payment: Payment): void {

    const index = this.payments.findIndex(p => p.id === payment.id);

    if (index !== -1) {
      this.payments[index] = payment;
    }

  }

  delete(id: number): void {
    this.payments =
      this.payments.filter(p => p.id !== id);
  }

}