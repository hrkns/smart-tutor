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
import {
  SimpleTopic
} from '../../types/simple-topic';
import {
  RemoveElementFromArray,
  MoveElementFromIndexFromArrayToPosition
} from '../../utils/methods.utils';

@Component({
  selector: 'app-multiple-select-using-search',
  templateUrl: './multiple-select-using-search.component.html',
  styleUrls: ['./multiple-select-using-search.component.scss']
})

export class MultipleSelectUsingSearchComponent implements OnInit {

  @Input() apiSource: (parameters ? : any) => Observable < any > ;

  public inputForSearch = '';
  public topicsSearchResults: SimpleTopic[];
  public selectedTopicsFromSearchResults: SimpleTopic[];
  public searchingTopics = false;

  private counterOfChanges = 0;
  private maxAmountOfResults = 10;

  constructor(
    private logger: LoggerService
  ) {

    this.topicsSearchResults = [];
    this.selectedTopicsFromSearchResults = [];
  }

  ngOnInit(): void {}

  public dataChanged(inputSearchText: string): void {

    this.counterOfChanges++;
    this.searchingTopics = this.inputForSearch.trim()
      .length > 0;

    setTimeout(() => {

      this.counterOfChanges--;

      if (this.counterOfChanges === 0) {

        this.search(inputSearchText);
      }
    }, 1000);
  }

  public selectTopicFromSearchResults(selectedTopic: SimpleTopic): void {

    this.selectedTopicsFromSearchResults.push(selectedTopic);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.topicsSearchResults = RemoveElementFromArray(this.topicsSearchResults, (value: SimpleTopic) => value._id === selectedTopic._id);

    if (this.topicsSearchResults.length === this.maxAmountOfResults - 1) {

      this.search(this.inputForSearch);
    }
  }

  public indicateToSearchATopic(): boolean {

    return this.inputForSearch.trim()
      .length === 0 && this.topicsSearchResults.length === 0;
  }

  public noResultsFromSearch(): boolean {

    return this.topicsSearchResults.length === 0 && this.inputForSearch.trim()
      .length > 0 &&
      !this.searchingTopics && this.counterOfChanges === 0;
  }

  public removeTopicFromSelectedList(topictoBeRemoved: SimpleTopic): void {

    if (this.searchingTopics) {

      return;
    }

    this.selectedTopicsFromSearchResults = RemoveElementFromArray(this.selectedTopicsFromSearchResults,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (value: SimpleTopic) => value._id === topictoBeRemoved._id);
    this.topicsSearchResults.push(topictoBeRemoved);
  }

  public moveUp(indexOfElement: number): void {

    if (indexOfElement > 0) {

      this.selectedTopicsFromSearchResults = MoveElementFromIndexFromArrayToPosition(this.selectedTopicsFromSearchResults,
        indexOfElement, indexOfElement - 1);
    }
  }

  public moveDown(indexOfElement: number): void {

    if (indexOfElement < this.selectedTopicsFromSearchResults.length - 1) {

      this.selectedTopicsFromSearchResults = MoveElementFromIndexFromArrayToPosition(this.selectedTopicsFromSearchResults,
        indexOfElement, indexOfElement + 1);
    }
  }

  private search(inputSearchText: string): void {

    inputSearchText = inputSearchText.trim();

    if (inputSearchText.length === 0) {

      this.topicsSearchResults = [];
      return;
    }

    this.topicsSearchResults = [];
    this.searchingTopics = true;

    this
      .apiSource({
        keywords: inputSearchText,
        limit: this.maxAmountOfResults,
        exclude: this.selectedTopicsFromSearchResults.map(v => v._id),
      })
      .subscribe((result: SimpleTopic[]) => {

        this.logger.success('Topics search result.', result);
        this.topicsSearchResults = result;
        this.searchingTopics = false;
      }, error => {

        this.logger.error('Topics search error.', error);
        this.searchingTopics = false;
      });
  }
}
