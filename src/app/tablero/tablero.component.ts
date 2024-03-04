import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SautenticacionService } from '../servicios/sautenticacion.service';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent implements OnInit, OnDestroy{

   _autenticacionServicio = inject(SautenticacionService)
   usuarioDatosLogeado: any = {}
   hayUsuarioLogeado: boolean = false

  ngOnInit(): void {
    console.log(this._autenticacionServicio.usuarioActualDatos());
    this.usuarioDatosLogeado = this._autenticacionServicio.usuarioActualDatos()
    this.hayUsuarioLogeado = this._autenticacionServicio.hayUsuarioLogeado()
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
