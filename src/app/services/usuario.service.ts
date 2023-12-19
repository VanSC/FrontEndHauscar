// UsuarioService
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = 'http://localhost:3000/api/';
  dni: string = 'Sin DNI.....!!!';

  private userInfo: any = null; // Almacena la información del usuario

  setUserInfo(userInfo: any): void {
    this.userInfo = userInfo;
  }

  getUserInfo(): any {
    return this.userInfo;
  }
  constructor(private http: HttpClient) { }

  postUserLogin(userLogin: User): Observable<any> {
    const url = this.baseUrl + 'login';
    return this.http.post(url, userLogin);
  }

  async authenticateUser(user: User): Promise<{ autenticado: boolean; mensaje?: string }> {
    try {
      const apiResponse: any = await this.postUserLogin(user).toPromise();

      if (apiResponse && apiResponse.message === "Inicio de sesión exitoso") {
        this.setUserInfo(apiResponse.usuario); // Almacena la información del usuario
        this.dni = user.dni;
        return { autenticado: true };
      } else {
        return { autenticado: false, mensaje: apiResponse?.message || 'Error desconocido' };
      }
    } catch (error) {
      console.error('Error al autenticar al usuario:', error);
      return { autenticado: false, mensaje: 'Error de la API' };
    }
  }
  isAuthenticated(): boolean {
    return !!this.userInfo;
  }
}
