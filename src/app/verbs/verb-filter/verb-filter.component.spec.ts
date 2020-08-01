import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbFilterComponent } from './verb-filter.component';

describe('VerbFilterComponent', () => {
  let component: VerbFilterComponent;
  let fixture: ComponentFixture<VerbFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
