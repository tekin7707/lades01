import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadListComponent } from './lad-list.component';

describe('LadListComponent', () => {
  let component: LadListComponent;
  let fixture: ComponentFixture<LadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
