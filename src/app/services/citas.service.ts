import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Especialista {
  id: number;
  nombreCompleto: string;
  apellido: string;
  ciudad: string;
  compania: string;
  especialidad: string;
  disponible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

 
  private nombresCo = [
    { nombre: 'Carlos Alberto Gómez', apellido: 'Gómez' },
    { nombre: 'María Fernanda Rodríguez', apellido: 'Rodríguez' },
    { nombre: 'Juan David Martínez', apellido: 'Martínez' },
    { nombre: 'Ana Sofía López', apellido: 'López' },
    { nombre: 'Diego Fernando Hernández', apellido: 'Hernández' },
    { nombre: 'Laura Valentina Ramírez', apellido: 'Ramírez' },
    { nombre: 'Andrés Felipe Torres', apellido: 'Torres' },
    { nombre: 'Camila Andrea Vargas', apellido: 'Vargas' },
    { nombre: 'Alejandro Morales', apellido: 'Morales' },
    { nombre: 'Natalia Castro', apellido: 'Castro' }
  ];

  private ciudadesCo = ['Neiva', 'Bogotá', 'Medellín', 'Cali', 'Ibagué', 'Popayán'];
  private epsCo = ['EPS Sanitas', 'EPS Sura', 'Nueva EPS', 'Compensar', 'Coosalud', 'Famisanar'];
  private especialidades = [
    'Cardiología', 'Medicina General', 'Pediatría', 
    'Dermatología', 'Neurología', 'Oftalmología', 
    'Ginecología', 'Ortopedia'
  ];

  constructor(private http: HttpClient) {}

  getEspecialistas(): Observable<Especialista[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map((user, i) => {
        const personaCo = this.nombresCo[i % this.nombresCo.length];

        return {
          id: user.id,
          nombreCompleto: personaCo.nombre,
          apellido: personaCo.apellido,
          ciudad: this.ciudadesCo[i % this.ciudadesCo.length],
          compania: this.epsCo[i % this.epsCo.length],
          especialidad: this.especialidades[i % this.especialidades.length],
          disponible: i % 3 !== 0
        };
      }))
    );
  }
}