import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  Environment
} from 'src/environments/environment';
import {
  endpoints
} from 'src/app/utils/api.utils';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = Environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getTopics(): Observable < any > {

    return this.http.get(`${this.apiUrl}${endpoints.getTopics}`);
  }
}
