import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarios = [
    { email: 'admin@example.com', password: 'admin123' },
    { email: 'user@example.com', password: 'user123' }
  ];

  login(email: string, password: string): Observable<any> {
    const usuario = this.usuarios.find(user => user.email === email && user.password === password);

    if (usuario) {
      localStorage.setItem('token', 'jwt-token');
      return of({ success: true }).pipe(delay(1000));
    } else {
      return throwError('Correo o contraseña incorrectos').pipe(delay(1000));
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}