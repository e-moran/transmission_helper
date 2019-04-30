import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAddDialogComponent } from './search-add-dialog.component';

describe('SearchAddDialogComponent', () => {
  let component: SearchAddDialogComponent;
  let fixture: ComponentFixture<SearchAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
