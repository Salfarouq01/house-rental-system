import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PaymentService } from '../../../core/services/payment.service';
import { TenantService } from '../../../core/services/tenant.service';
import { Payment } from '../../../core/Models/payment.model';
import { Tenant } from '../../../core/Models/tenant.model';


@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './payment-list.html',
  styleUrl: './payment-list.css'
})
export class PaymentListComponent {

  private paymentService = inject(PaymentService);
  private tenantService = inject(TenantService);
  private router = inject(Router);

  payments: Payment[] = [];

  displayedColumns = [
    'tenant',
    'amount',
    'month',
    'paymentMethod',
    'paymentDate',
    'status',
    'actions'
  ];

  constructor() {
    this.loadPayments();
  }

  loadPayments(): void {
    this.payments = this.paymentService.getAll();
  }

  getTenant(id: number): Tenant | undefined {
    return this.tenantService.getById(id);
  }

  addPayment(): void {
    this.router.navigate(['/payments/add']);
  }

  editPayment(id: number): void {
    this.router.navigate(['/payments/edit', id]);
  }

  viewPayment(id: number): void {
    this.router.navigate(['/payments/details', id]);
  }

  deletePayment(id: number): void {

    if (!confirm('Delete this payment?')) {
      return;
    }

    this.paymentService.delete(id);
    this.loadPayments();

  }

}