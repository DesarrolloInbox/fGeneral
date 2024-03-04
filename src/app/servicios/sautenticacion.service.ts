import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SautenticacionService {

  constructor() { }

  private _http = inject(HttpClient);
  private urlBase: string = 'https://apigeneral.onrender.com/api/login'

  hayUsuarioLogeado = signal(false)

  usuarioActualDatos = signal({
    token: '', 
    id: '',
    nombre: '',
    correo: '',
    seguridad: ''})

  postIniciar(entrada: any): Observable<any>{
    return this._http.post<any>(this.urlBase, {
      correo: entrada.correo,
      contrasena: entrada.contrasena
    })
  }

}
