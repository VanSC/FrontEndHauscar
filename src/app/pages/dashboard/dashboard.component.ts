import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
} from 'ng-apexcharts';

import { RegistrovehiculoService } from 'src/app/services/registrovehiculo.service';


export interface salesOverviewChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

export interface yearlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

export interface monthlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

export interface RegistroVehiculos {
  placa: string;
  tipoVehiculo: string;
  precio: string;
  cargaUtil: string;
  fechaRegistro: string;
  horaRegistro: string;
}

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent {


  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public yearlyChart!: Partial<yearlyChart> | any;

  displayedColumns: string[] = ['placa', 'carga', 'tipo', 'precio', 'hora', 'fecha'];
  dataSource: RegistroVehiculos[] = [];

  constructor(private registroService: RegistrovehiculoService) {

    // yearly breakup chart
    this.yearlyChart = {
      series: [38, 40, 25],

      chart: {
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 130,
      },
      colors: ['#5D87FF', '#ECF2FF', '#F9F9FD'],
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          donut: {
            size: '75%',
            background: 'transparent',
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 120,
            },
          },
        },
      ],
      tooltip: {
        enabled: false,
      },
    };
  }

  tiposVehiculos: any[] = [];

  ngOnInit(): void {
    this.cargarDatosRegistros();
    this.cargarTiposVehiculos();
  }

  cargarTiposVehiculos() {
    this.registroService.getTiposVehiculos().subscribe(
      (tipos: any[]) => {
        console.log(tipos);
        this.tiposVehiculos = tipos;
      },
      error => {
        console.error('Error al obtener tipos de vehículos:', error);
      }
    );
  }

  cargarDatosRegistros() {
    // Llamada al servicio para obtener datos
    this.registroService.getListaporfecha().subscribe(
      (registros: RegistroVehiculos[]) => {
        console.log(registros);
        this.dataSource = registros.map(registro => ({
          placa: registro.placa,
          tipoVehiculo: registro.tipoVehiculo,
          precio: registro.precio.toString(),
          cargaUtil: registro.cargaUtil.toString(),
          fechaRegistro: this.formatoFecha(registro.fechaRegistro),
          horaRegistro: this.formatoHora(registro.horaRegistro)
        }));
      },
      error => {
        console.error('Error al obtener registros:', error);
      }
    );
  }

  filtro = {
    precio: '',
    fecha: '',
    hora: '',
    idTipoVehiculo: '',
  };

  filtrarRegistros(formulario: NgForm) {
    const valores = formulario.value;
    console.log(valores)
    this.registroService.filtrarRegistros(valores).subscribe(
      (registros: RegistroVehiculos[]) => {
        this.dataSource = registros.map((registro) => ({
          placa: registro.placa,
          tipoVehiculo: registro.tipoVehiculo,
          precio: registro.precio.toString(),
          cargaUtil: registro.cargaUtil.toString(),
          fechaRegistro: this.formatoFecha(registro.fechaRegistro),
          horaRegistro: this.formatoHora(registro.horaRegistro),
        }));
      },
      (error) => {
        console.error('Error al filtrar registros:', error);
      }
    );
  }
  formatoFecha(fecha: string): string {
    const fechaObj = new Date(fecha);
    const fechaFormateada = fechaObj.toLocaleDateString();
    return fechaFormateada;
  }
  formatoHora(hora: string): string {
    const horaObj = new Date(`2000-01-01T${hora}`);
    const horaFormateada = horaObj.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
    return horaFormateada;
  }

  generarInformePDF() {
    const data = this.dataSource.map(registro => [
      registro.placa,
      registro.tipoVehiculo,
      registro.precio,
      registro.cargaUtil,
      registro.fechaRegistro,
      registro.horaRegistro
    ]);

    const headers = ['Placa', 'Tipo de Vehículo', 'Precio', 'Carga Útil', 'Fecha de Registro', 'Hora de Registro'];

    const docDefinition = {
      content: [
        { text: 'Informe de Registros', style: 'header' },
        { text: new Date().toLocaleString(), alignment: 'right' },
        { table: { headerRows: 1, body: [headers, ...data] } }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };

    pdfMake.createPdf(docDefinition).download('Informe_Registros.pdf');
  }
}
