import { Component, OnInit } from '@angular/core';
import Chart, { ChartType, ChartDataset } from 'chart.js/auto';
import { RegistrovehiculoService } from 'src/app/services/registrovehiculo.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})

export class BarChartComponent implements OnInit {
  public chart: Chart;

  constructor(private _registroService: RegistrovehiculoService) {}

  ngOnInit(): void {
    // Llamada al servicio para obtener datos
    this._registroService.getcantTipoVehiculos().subscribe((datos) => {
      this.actualizarGrafico(datos);
    });
  }

  private actualizarGrafico(datos: any[]): void {
    const labels = datos.map((d) => d.tipoVehiculo);
    const data = datos.map((d) => d.cantidadRegistros);

    const datasets: ChartDataset[] = [{
      label: 'Cantidad de Registros por Tipo de Vehículo',
      data: data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }];

    // Verifica si la gráfica ya existe, si es así, destrúyela antes de crear una nueva
    if (this.chart) {
      this.chart.destroy();
    }

    // Creamos la nueva gráfica
    this.chart = new Chart("chart", {
      type: 'bar' as ChartType,
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}