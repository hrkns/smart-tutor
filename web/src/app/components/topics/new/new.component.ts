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
    children: new FormControl([]),
  });

  public constructor(
    private titleService: Title,
    private API: ApiService,
    private logger: LoggerService,
  ) {

    this.titleService.setTitle('Create Topic');
  }

  public ngOnInit(): void {

    this.API.getTopics()
      .subscribe(result => {

        this.logger.success('Success requesting topics.', result);
      }, error => {

        this.logger.error('Error requesting topics.', error);
      });
  }

  public submitNewtopic(): void {

    this.logger.info('Submitting a new topic...', this.newTopicForm.value);
  }
}
