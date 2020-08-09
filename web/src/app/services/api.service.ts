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
import {
  SearchQueryParameters
} from '../types/search-query-parameters';
import {
  LoggerService
} from '../services/logger.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = Environment.apiUrl;

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  public getTopics = (queryParameters ? : SearchQueryParameters): Observable < any > => {

    const url = `${this.apiUrl}${endpoints.getTopics}${this.buildQueryStringFromSearchQueryParameters(queryParameters)}`;

    this.logger.info('Getting topics...', 'HTTP request.', url);

    return this.http.get(url);
  };

  private buildQueryStringFromSearchQueryParameters(queryParameters ? : SearchQueryParameters): string {
    const queryString = new Array < string > ();

    if (queryParameters && queryParameters.keywords && queryParameters.keywords.trim()
      .length) {

      queryString.push(`keywords=${queryParameters.keywords.trim()}`);
    }

    if (queryParameters && queryParameters.limit > 0) {

      queryString.push(`limit=${queryParameters.limit}`);
    }

    return (queryString.length ? '?' : '') + queryString.join('&');
  }
}
