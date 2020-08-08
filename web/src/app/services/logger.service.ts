import {
  Injectable
} from '@angular/core';
import {
  NGXLogger
} from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})

export class LoggerService {

  constructor(private logger: NGXLogger) {}

  public info(...messages): void {

    messages.forEach(s => this.logger.log(s));
  }

  public success(...messages): void {

    messages.forEach(s => this.logger.info(s));
  }

  public warning(...messages): void {

    messages.forEach(s => this.logger.warn(s));
  }

  public error(...messages): void {

    messages.forEach(s => this.logger.error(s));
  }
}
