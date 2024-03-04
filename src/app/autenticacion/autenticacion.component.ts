import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SautenticacionService } from '../servicios/sautenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticacion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './autenticacion.component.html',
  styleUrl: './autenticacion.component.css'
})
export class AutenticacionComponent {

  private formaBuilder = inject(FormBuilder)
  private _autenticacionServicio = inject(SautenticacionService)
  private router = inject(Router)
  cargando: boolean = false;

  usuarioDatosLogeado : any = {}
  leyendaError: string = ''


  formaIniciar = this.formaBuilder.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', Validators.required]
  })

  get getCorreo(){
    return this.formaIniciar.controls.correo
  }

  get getContrasena(){
    return this.formaIniciar.controls.contrasena
  }

  btnIniciar(){
    this.cargando = true;
    if (this.formaIniciar.valid){
      this._autenticacionServicio
      .postIniciar({correo: this.getCorreo.value, contrasena: this.getContrasena.value})
      .subscribe({
        next: (data)=>{
          this.usuarioDatosLogeado = data
        },
        error: ()=>{
          this.leyendaError = 'Hubo error del servidor, favor de volver a intentar'
        },
        complete: ()=>{
          if (this.usuarioDatosLogeado.estado === 0){
            this.leyendaError = this.usuarioDatosLogeado.error
          }else{
            this._autenticacionServicio.usuarioActualDatos.set({
                token: this.usuarioDatosLogeado.payload.token, 
                id: this.usuarioDatosLogeado.payload.id,
                nombre: this.usuarioDatosLogeado.payload.nombre,
                correo: this.usuarioDatosLogeado.payload.correo,
                seguridad: this.usuarioDatosLogeado.payload.seguridad
            });
            this.formaIniciar.reset()
            this.router.navigateByUrl('tablero')
          }
          this.cargando = false;
        }
      })

    }else{
      this.formaIniciar.markAllAsTouched();
      this.cargando = false;
    }
    
  }
}
