/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Title
} from '@angular/platform-browser';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  ApiService,
  LoggerService
} from 'src/app/services';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})

export class NewComponent implements OnInit {

  public newTopicForm = new FormGroup({
    title: new FormControl('', [
      // eslint-disable-next-line @typescript-eslint/unbound-method
      Validators.required,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      Validators.minLength(1)
    ]),
    description: new FormControl(''),
    content: new FormControl(''),
    files: new FormControl([]),
  });
  public childTopics: string[];
  public saving = false;

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

    if (this.newTopicForm.valid) {

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = this.newTopicForm.value;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const files = this.newTopicForm.value.files;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      payload.children = this.childTopics;

      delete payload.files;
      this.saving = true;

      this.API.createTopic(payload).subscribe(result => {

        this.logger.success('Success creating a new topic.', result);

        // then, upload the files

        this.saving = false;
      }, error => {

        this.logger.error('Error creating a new topic.', error);
        this.saving = false;
      });
    }
  }

  public setChildTopics(childTopics: string[]): void {

    this.childTopics = childTopics;
  }

  public error(fieldIdentifier: string): boolean {

    const formField = this.newTopicForm.get(fieldIdentifier);
    let condition = false;

    switch (fieldIdentifier) {
    case 'title':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      condition = formField.errors && formField.errors.required;
      break;
    }

    return condition && (formField.dirty || formField.touched);
  }
}
