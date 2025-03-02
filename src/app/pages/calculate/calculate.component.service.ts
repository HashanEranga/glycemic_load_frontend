import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculateComponentService {
  private baseUrl = 'http://127.0.0.1:8000'; 

  constructor(private http: HttpClient) {}

  saveNutrients(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/predict/`, data);
  }

  retrieveByName(name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    return this.http.get(`${this.baseUrl}/retrieve/`, { params });
  }

  retrieveAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve/all`);
  }
}
