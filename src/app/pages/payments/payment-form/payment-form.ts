import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { PaymentService } from '../../../core/services/payment.service';
import { TenantService } from '../../../core/services/tenant.service';
import { RoomService } from '../../../core/services/room.service';
import { Payment } from '../../../core/Models/payment.model';
import { Tenant } from '../../../core/Models/tenant.model';



@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.css'
})
export class PaymentFormComponent {

  private fb = inject(FormBuilder);
  private paymentService = inject(PaymentService);
  private tenantService = inject(TenantService);
  private roomService = inject(RoomService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);


  tenants: Tenant[] = [];

  isEdit = false;
  paymentId = 0;


  form = this.fb.group({

    tenantId: [
      null as number | null,
      Validators.required
    ],

    amount: [
      0,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    paymentDate: [
      new Date(),
      Validators.required
    ],

    paymentMethod: [
      'Cash',
      Validators.required
    ],

    referenceNumber: [
      ''
    ],

    month: [
      '',
      Validators.required
    ],

    year: [
      new Date().getFullYear(),
      Validators.required
    ],

    status: [
      'Paid',
      Validators.required
    ],

    notes:[
      ''
    ]

  });


  constructor(){

    this.tenants =
      this.tenantService.getAll();


    const id =
      this.route.snapshot.paramMap.get('id');


    if(id){

      this.isEdit = true;

      this.paymentId =
        Number(id);


      const payment =
        this.paymentService.getById(this.paymentId);


      if(payment){

        this.form.patchValue({

          tenantId: payment.tenantId,

          amount: payment.amount,

          paymentDate:
            new Date(payment.paymentDate),

          paymentMethod:
            payment.paymentMethod,

          referenceNumber:
            payment.referenceNumber,

          month:
            payment.month,

          year:
            payment.year,

          status:
            payment.status,

          notes:
            payment.notes

        });

      }

    }

  }


  loadTenantRent(){

    const tenantId =
      this.form.value.tenantId;


    if(!tenantId)
      return;


    const tenant =
      this.tenantService.getById(tenantId);


    if(!tenant)
      return;


    const room =
      this.roomService.getById(
        tenant.roomId
      );


    if(room){

      this.form.patchValue({

        amount:
          room.monthlyRent

      });

    }

  }



  save(){

    if(this.form.invalid){

      this.form.markAllAsTouched();

      return;

    }


    const value =
      this.form.getRawValue();



    const payment: Payment = {

      id:
        this.isEdit
        ? this.paymentId
        : 0,


      tenantId:
        value.tenantId!,


      amount:
        value.amount!,


      paymentDate:
        new Date(value.paymentDate!),


      paymentMethod:
        value.paymentMethod as any,


      referenceNumber:
        value.referenceNumber ?? '',


      month:
        value.month!,


      year:
        value.year!,


      status:
        value.status as any,


      notes:
        value.notes ?? ''

    };



    if(this.isEdit){

      this.paymentService.update(payment);

    }
    else{

      this.paymentService.add(payment);

    }


    this.router.navigate(['/payments']);

  }



  cancel(){

    this.router.navigate(['/payments']);

  }

}