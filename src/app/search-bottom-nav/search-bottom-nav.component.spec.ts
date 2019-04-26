import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBottomNavComponent } from './search-bottom-nav.component';

describe('SearchBottomNavComponent', () => {
  let component: SearchBottomNavComponent;
  let fixture: ComponentFixture<SearchBottomNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBottomNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBottomNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
