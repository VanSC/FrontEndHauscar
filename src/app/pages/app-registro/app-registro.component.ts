// AppRegistroComponent
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroVehiculo } from 'src/app/models/registro';
import { RegistrovehiculoService } from 'src/app/services/registrovehiculo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-app-registro',
  templateUrl: './app-registro.component.html',
  styleUrls: ['./app-registro.component.scss']
})
export class AppRegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _registroService: RegistrovehiculoService,
    private _usuarioService: UsuarioService
  ) {
    this.registroForm = this.fb.group({
      placa: ['', Validators.required],
      imagenPath: ['C:\\Users\\Vane\\Documents\\TESIS\\pruebaimg.jpg'],
    });
  }

  agregarRegistro() {
    // Obtener información del usuario del servicio de autenticación
    const userInfo = this._usuarioService.getUserInfo();
  
    if (userInfo) {
      const userId = userInfo.id;
  
      if (userId) {
        const REGISTROVEHICULO: RegistroVehiculo = {
          placa: this.registroForm.get('placa')?.value,
          imagenPath: this.registroForm.get('imagenPath')?.value,
          idUsuario: userId,
        };
  
        console.log('Datos enviados:', REGISTROVEHICULO);
  
        this._registroService.postRegistroVehiculo(REGISTROVEHICULO).subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/page/dashboard']);
          },
          error => {
            console.error('Error al registrar el vehículo:', error);
          }
        );
      } else {
        console.error('ID del usuario es nulo o indefinido.');
      }
    } else {
      console.error('La información del usuario no está disponible.');
    }
  }
}
