import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroVehiculo } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistrovehiculoService {

  private baseUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getRegistrosVehiculos(): Observable<any> {
    const url = this.baseUrl + 'registros';
    return this.http.get(url);
  }

  getListaporfecha(): Observable<any> {
    const url = this.baseUrl + 'ordenarporhora';
    return this.http.get(url);
  }
  
  postRegistroVehiculo(registrovehiculo: RegistroVehiculo): Observable<any> {
    const url = this.baseUrl + 'registrarvehiculo';
    return this.http.post(url, registrovehiculo);
  }

  //filtros
  getcantTipoVehiculos(): Observable<any> {
    const url = this.baseUrl + 'cantidadtipo';
    return this.http.get<any[]>(url);
  }


  // Método para contar registros por tipo de vehículo
  contarRegistros(filtro: any): Observable<any> {
    const url = this.baseUrl + 'contarregistros';
    return this.http.post(url, filtro);
  }

  // Método para sumar ingresos por fecha
  sumarIngresosPorFecha(): Observable<any> {
    const url = this.baseUrl + 'sumarporfecha';
    return this.http.get(url);
  }

  // Método para sumar precio total del día
  sumarPrecioTotalDelDia(): Observable<any> {
    const url = this.baseUrl + 'preciototaldeldia';
    return this.http.get(url);
  }

  // Método para contar registros por semana
  contarRegistrosPorSemana(): Observable<any> {
    const url = this.baseUrl + 'registrossemanales';
    return this.http.get(url);
  }

  // Método para contar registros por mes
  contarRegistrosPorMes(): Observable<any> {
    const url = this.baseUrl + 'registrosmensuales';
    return this.http.get(url);
  }

  //filtro de registros
  filtrarRegistros(data: any): Observable<any> {
    const url = this.baseUrl + 'filtroregistro';
    return this.http.post(url, data);
  }

  // Método para obtener la lista de tipos de vehículos
  getTiposVehiculos(): Observable<any> {
    const url = this.baseUrl + 'tiposvehiculos';
    return this.http.get(url);
  }
}
