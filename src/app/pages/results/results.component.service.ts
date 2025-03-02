import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultsComponentService {
  private baseUrl = 'http://127.0.0.1:8000'; 

  constructor(private http: HttpClient) {}

  retrieveByName(foodName: string): Observable<any> {
    const params = new HttpParams().set('foodName', foodName);
    return this.http.get(`${this.baseUrl}/retrieve/`, { params });
  }

  retrieveAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve/all`);
  }
}
