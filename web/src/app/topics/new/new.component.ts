import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  public constructor(private titleService: Title ) {

    this.titleService.setTitle( 'Create Topic' );
  }

  ngOnInit(): void {
  }

}
