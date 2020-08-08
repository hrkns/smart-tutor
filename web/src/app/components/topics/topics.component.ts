import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  public constructor(private titleService: Title ) {

    this.titleService.setTitle( 'Topics' );
  }

  ngOnInit(): void {
  }
}
