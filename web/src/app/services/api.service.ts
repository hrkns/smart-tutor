import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from './../../environments/environment';
import { endpoints } from './../utils/api.utils';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = Environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getTopics() {

    return this.http.get(`${this.apiUrl}${endpoints.getTopics}`);
  }
}
