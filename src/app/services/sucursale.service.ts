import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursaleService {
  private baseUrl = 'http://localhost:8080/springboot-crud-rest/api/v1/sucursale';

  constructor(private http: HttpClient) { }

  getSucursala(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createSucursala(sucursala: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, sucursala);
  }

  updateSucurala(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteSucursala(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getSucursalaList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
