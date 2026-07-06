import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(email: string, password: string): boolean {

    if (email === 'admin@gmail.com' && password === '1234') {
      localStorage.setItem('user', JSON.stringify({ email }));
      return true;
    }

    return false;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}