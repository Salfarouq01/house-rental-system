import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-layout',
  standalone: true,

  imports: [
    CommonModule,
    RouterModule,

    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],

  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class LayoutComponent {


  private authService = inject(AuthService);

  private router = inject(Router);



  logout(){

    this.authService.logout();

    this.router.navigate(['/login']);

  }


}