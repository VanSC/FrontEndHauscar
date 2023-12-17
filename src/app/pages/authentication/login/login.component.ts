import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataLogin: UsuarioService
  ) {
    this.loginForm = this.fb.group({
      dni: ['', Validators.required],
      contraseña: ['', Validators.required],
    });
  }

  async loginUser() {
    const USER: User = {
      dni: this.loginForm.get('dni')?.value,
      contraseña: this.loginForm.get('contraseña')?.value,
    };

    const authenticationResult = await this.dataLogin.authenticateUser(USER);

    if (authenticationResult.autenticado) {
      this.router.navigate(['/page/dashboard']);
    } else {
      console.error('Error en la autenticación:', authenticationResult.mensaje);
    }
  }
}
