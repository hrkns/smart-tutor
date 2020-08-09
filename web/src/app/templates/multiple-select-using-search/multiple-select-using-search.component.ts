import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  LoggerService
} from '../../services/logger.service';

@Component({
  selector: 'app-multiple-select-using-search',
  templateUrl: './multiple-select-using-search.component.html',
  styleUrls: ['./multiple-select-using-search.component.scss']
})

export class MultipleSelectUsingSearchComponent implements OnInit {

  @Input() apiSource: (parameters ? : any) => Observable < any > ;

  public inputForSearch = '';

  private counterOfChanges = 0;

  constructor(
    private logger: LoggerService
  ) {}

  ngOnInit(): void {}

  public dataChanged(inputSearchText: string): void {

    this.counterOfChanges++;

    setTimeout(() => {

      this.counterOfChanges--;

      if (this.counterOfChanges === 0) {

        this.search(inputSearchText);
      }
    }, 1000);
  }

  private search(inputSearchText: string): void {

    inputSearchText = inputSearchText.trim();

    if (inputSearchText.length === 0) {
      return;
    }

    this.apiSource({
      keywords: inputSearchText,
      limit: 10,
    })
      .subscribe(result => {

        this.logger.success('Topics search result.', result);
      }, error => {

        this.logger.error('Topics search error.', error);
      });
  }
}
