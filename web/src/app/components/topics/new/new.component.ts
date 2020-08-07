import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
    files : new FormControl(),
  });

  public constructor(private titleService: Title ) {

    this.titleService.setTitle( 'Create Topic' );
  }

  public ngOnInit(): void {
  }

  public submitNewtopic(): void {

    console.log('this.newTopicForm', this.newTopicForm);
  }
}
