import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ImagenService } from 'src/app/services/image-service.service';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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

@Component({
  selector: 'app-reporte-registro',
  templateUrl: './reporte-registro.component.html',
  styleUrls: ['./reporte-registro.component.scss']
})
export class ReporteRegistroComponent {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public yearlyChart!: Partial<yearlyChart> | any;

  displayedColumns: string[] = ['placa', 'carga', 'tipo', 'precio', 'hora', 'fecha'];
  dataSource: RegistroVehiculos[] = [];

  constructor(private registroService: RegistrovehiculoService, private imagenService: ImagenService) {

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

  filtro = {
    precio: '',
    fecha: '',
    hora: '',
    idTipoVehiculo: '',
  };

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
  cargarDatosRegistros() {
    // Llamada al servicio para obtener datos
    this.registroService.getRegistrosVehiculos().subscribe(
      (registros: RegistroVehiculos[]) => {
        console.log(registros);
        // Mapear los datos al formato que necesita tu tabla
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

  async generarInformePDF() {
    const logoDataUrl = await this.imagenService.cargarImagenComoDataUrl('assets/images/logos/logo.png');

    const content = [
      {
        alignment: 'center',
        text: 'Informe Diario',
        style: 'header'
      },
      { image: logoDataUrl, width: 100, height: 50 },
      { text: 'Fecha: ' + new Date().toLocaleDateString(), style: 'fecha' },
      {
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'], // Ancho automático para cada columna
          body: [
            [
              { text: 'Placa', style: 'tableHeader' },
              { text: 'Tipo de Vehículo', style: 'tableHeader' },
              { text: 'Precio', style: 'tableHeader' },
              { text: 'Carga Útil', style: 'tableHeader' },
              { text: 'Fecha de Registro', style: 'tableHeader' },
              { text: 'Hora de Registro', style: 'tableHeader' },
            ],
            // Filas de datos reales obtenidos del servicio
            ...this.dataSource.map(registro => [
              registro.placa,
              registro.tipoVehiculo,
              registro.precio,
              registro.cargaUtil,
              registro.fechaRegistro,
              registro.horaRegistro
            ]),
          ],
        },
        style: 'tableStyle',
      },
    ];

    const styles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      fecha: {
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      tableStyle: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        fontSize: 12,
        bold: true,
        color: 'white',
        fillColor: '#1E3163',
        alignment: 'center',
        margin: [0, 5, 0, 5],
      },
    };

    const documentDefinition = {
      content,
      styles,
    };

    pdfMake.createPdf(documentDefinition).download('informe_diario.pdf');
  }
}
