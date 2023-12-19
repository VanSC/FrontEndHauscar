import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { AppRegistroComponent } from './pages/app-registro/app-registro.component';
import { DetalleRegistroComponent } from './pages/detalle-registro/detalle-registro.component';
import { ReporteRegistroComponent } from './pages/reporte-registro/reporte-registro.component';
import { FacturaRegistroComponent } from './pages/factura-registro/factura-registro.component';
import { EstadisticaRegistroComponent } from './pages/estadistica-registro/estadistica-registro.component';
import { LineChartComponent } from './pages/graficos/line-chart/line-chart.component';
import { BarChartComponent } from './pages/graficos/bar-chart/bar-chart.component';
import { PieChartComponent } from './pages/graficos/pie-chart/pie-chart.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    AppRegistroComponent,
    DetalleRegistroComponent,
    ReporteRegistroComponent,
    FacturaRegistroComponent,
    EstadisticaRegistroComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    MatPaginatorModule
    
    
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  providers: [AuthGuard],
})
export class AppModule {}
