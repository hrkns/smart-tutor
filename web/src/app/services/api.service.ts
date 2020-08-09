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
} from 'src/app/utils';
import {
  SearchQueryParameters,
  TopicCreationPayload,
} from 'src/app/types';
import {
  LoggerService
} from 'src/app/services';

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

  public createTopic = (payload: TopicCreationPayload): Observable < any > => {

    console.log('endpoints', endpoints);

    const url = `${this.apiUrl}${endpoints.createTopic}`;
    this.logger.info('Creating topic...', 'HTTP request.', url, payload);
    return this.http.post(url, payload);
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

    if (queryParameters && queryParameters.exclude.length) {

      queryString.push(`exclude=${queryParameters.exclude.map(s => s.trim()).filter(s => s.length).join(',')}`);
    }

    return (queryString.length ? '?' : '') + queryString.join('&');
  }
}
