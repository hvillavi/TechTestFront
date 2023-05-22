import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  lat: string;
  lng: string;
  datos: any;
  errorMensaje: string;

  constructor(private http: HttpClient) { }

  consultar() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
    const url = `http://localhost:8080/tabla1/tabla1?lat=${this.lat}&lng=${this.lng}`;
    this.http.get<any>(url, { headers }).subscribe(
      response => {
        this.datos = response;
      },
      error => {
        console.error('Error al consultar:', error);
        // Manejo de errores
        this.errorMensaje = error;
      }
    );
  }

  getToken(): string {
    const name = 'token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  }
}
