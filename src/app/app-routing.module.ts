import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AppRegistroComponent } from './pages/app-registro/app-registro.component';
import { DetalleRegistroComponent } from './pages/detalle-registro/detalle-registro.component';
import { ReporteRegistroComponent } from './pages/reporte-registro/reporte-registro.component';
import { FacturaRegistroComponent } from './pages/factura-registro/factura-registro.component';
import { EstadisticaRegistroComponent } from './pages/estadistica-registro/estadistica-registro.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: 'page',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
      {
        path: "regitroVehiculo", component: AppRegistroComponent
      },
      {
        path: "detalleRegistro", component: DetalleRegistroComponent
      },
      {
        path: "reporteRegistro", component: ReporteRegistroComponent
      },
      {
        path: "facturaRegistro", component: FacturaRegistroComponent
      },
      {
        path: "estadisticas", component: EstadisticaRegistroComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
