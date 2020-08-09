import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSelectUsingSearchComponent } from './multiple-select-using-search.component';

describe('MultipleSelectUsingSearchComponent', () => {
  let component: MultipleSelectUsingSearchComponent;
  let fixture: ComponentFixture<MultipleSelectUsingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleSelectUsingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleSelectUsingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
