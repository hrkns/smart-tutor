import {
  Component,
  OnInit
} from '@angular/core';
import {
  Title
} from '@angular/platform-browser';
import {
  FormGroup,
  FormControl
} from '@angular/forms';
import {
  ApiService
} from 'src/app/services/api.service';
import {
  LoggerService
} from 'src/app/services/logger.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})

export class NewComponent implements OnInit {

  public newTopicForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    content: new FormControl(''),
    files: new FormControl([]),
  });
  public childTopics: string[];

  public constructor(
    public API: ApiService,
    private titleService: Title,
    private logger: LoggerService,
  ) {

    this.titleService.setTitle('Create Topic');
    this.childTopics = [];
  }

  public ngOnInit(): void {}

  public submitNewtopic(): void {

    this.logger.info('Submitting a new topic...', this.newTopicForm.value, this.childTopics);
  }

  public setChildTopics(childTopics: string[]): void {

    this.childTopics = childTopics;
  }
}
