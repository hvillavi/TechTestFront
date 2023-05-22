import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string;
  contrasena: string;
  errorMensaje: string;

  constructor(private http: HttpClient, private router: Router) { }

  iniciarSesion() {
    const body = { username: this.usuario, password: this.contrasena };
    this.http.post<any>('http://localhost:8080/authenticate', body).subscribe(
      response => {
        // Guardar el token en las cookies o en el almacenamiento local
        // Aquí se asume que el token se guarda en una variable llamada 'token'
        document.cookie = `token=${response.token}`;
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error al iniciar sesión:', error);
        // Manejo de errores
        this.errorMensaje = 'Error al iniciar sesión. Verifica tus credenciales.';
      }
    );
  }
}
