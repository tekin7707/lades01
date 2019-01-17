import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadActionComponent } from './lad-action.component';

describe('LadActionComponent', () => {
  let component: LadActionComponent;
  let fixture: ComponentFixture<LadActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
