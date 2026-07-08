import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


import { BaseChartDirective } from 'ng2-charts';


import {
  ChartConfiguration,
  ChartType
} from 'chart.js'



import { HouseService } from '../../../core/services/house.service';
import { RoomService } from '../../../core/services/room.service';
import { TenantService } from '../../../core/services/tenant.service';
import { PaymentService } from '../../../core/services/payment.service';



@Component({

  selector: 'app-dashboard',

  standalone: true,

  imports: [

    CommonModule,

    MatCardModule,

    MatIconModule,

    MatButtonModule,

    BaseChartDirective
  ],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css'

})


export class DashboardComponent implements OnInit {



  private houseService = inject(HouseService);

  private roomService = inject(RoomService);

  private tenantService = inject(TenantService);

  private paymentService = inject(PaymentService);





  totalHouses = 0;

  totalRooms = 0;

  availableRooms = 0;

  occupiedRooms = 0;

  totalTenants = 0;

  totalPayments = 0;

  totalIncome = 0;





  ngOnInit(): void {

    this.loadDashboard();

  }





  loadDashboard(){


    const houses =
      this.houseService.getAll();


    const rooms =
      this.roomService.getAll();


    const tenants =
      this.tenantService.getAll();


    const payments =
      this.paymentService.getAll();




    this.totalHouses =
      houses.length;



    this.totalRooms =
      rooms.length;




    this.availableRooms =
      rooms.filter(
        r => r.status === 'Available'
      ).length;




    this.occupiedRooms =
      rooms.filter(
        r => r.status === 'Occupied'
      ).length;




    this.totalTenants =
      tenants.length;




    this.totalPayments =
      payments.length;




    this.totalIncome =
      payments

      .filter(
        p => p.status === 'Paid'
      )

      .reduce(
        (sum,p)=>sum + p.amount,
        0
      );




    // update charts

    this.occupancyChartData =
    {

      ...this.occupancyChartData,

      datasets:[

        {

          label:'Rooms',

          data:[

            this.availableRooms,

            this.occupiedRooms

          ]

        }

      ]

    };





    this.paymentChartData =
    {

      ...this.paymentChartData,

      datasets:[

        {

          label:'Payments',

          data:[

            this.totalIncome,

            0

          ]

        }

      ]

    };


  }






  incomeChartType: ChartType = 'line';



  incomeChartData: ChartConfiguration['data'] = {


    labels:[

      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun'

    ],


    datasets:[

      {

        label:'Monthly Income',

        data:[

          500000,
          700000,
          900000,
          650000,
          1200000,
          1500000

        ],

        tension:0.4

      }

    ]


  };






  occupancyChartType: ChartType = 'doughnut';



  occupancyChartData: ChartConfiguration['data'] = {


    labels:[

      'Available Rooms',

      'Occupied Rooms'

    ],


    datasets:[

      {

        label:'Rooms',

        data:[

          0,

          0

        ]

      }

    ]


  };






  paymentChartType: ChartType = 'bar';



  paymentChartData: ChartConfiguration['data'] = {


    labels:[

      'Paid',

      'Pending'

    ],


    datasets:[

      {

        label:'Payments',

        data:[

          0,

          0

        ]

      }

    ]


  };






  chartOptions: ChartConfiguration['options'] = {


    responsive:true,


    maintainAspectRatio:false,


    plugins:{


      legend:{


        display:true


      }


    }


  };


}