import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import { FormGroup, FormControl } from '@angular/forms';

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
  });

  public constructor(private titleService: Title ) {

    this.titleService.setTitle( 'Create Topic' );
  }

  public ngOnInit(): void {
  }

  public submitNewtopic() {

    console.log('this.newTopicForm.value', this.newTopicForm.value);
  }
}
