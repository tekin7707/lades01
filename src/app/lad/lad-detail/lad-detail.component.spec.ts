import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadDetailComponent } from './lad-detail.component';

describe('LadDetailComponent', () => {
  let component: LadDetailComponent;
  let fixture: ComponentFixture<LadDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
