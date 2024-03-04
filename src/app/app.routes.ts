import { Routes } from '@angular/router';
import { TableroComponent } from './tablero/tablero.component';
import { AutenticacionComponent } from './autenticacion/autenticacion.component';

export const routes: Routes = [
    {path: 'tablero', component: TableroComponent},
    {path: 'login', component: AutenticacionComponent}
];
