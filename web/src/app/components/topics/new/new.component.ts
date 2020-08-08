import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  public newTopicForm = new FormGroup({
    title : new FormControl(''),
    description : new FormControl(''),
    content : new FormControl(''),
    files : new FormControl(),
  });

  public constructor(
    private titleService: Title,
    private API: ApiService
  ) {

    this.titleService.setTitle( 'Create Topic' );
  }

  public ngOnInit(): void {

    this.API.getTopics().subscribe(result => {

      console.log('Success requestin topics', result);
    }, error => {

      console.log('Error requesting topics', error);
    });
  }

  public submitNewtopic(): void {

    console.log('Submitting a new topic', this.newTopicForm);
  }
}
