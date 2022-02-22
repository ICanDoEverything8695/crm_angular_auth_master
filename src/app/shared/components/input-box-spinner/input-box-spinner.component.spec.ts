import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBoxSpinnerComponent } from './input-box-spinner.component';

describe('InputBoxSpinnerComponent', () => {
  let component: InputBoxSpinnerComponent;
  let fixture: ComponentFixture<InputBoxSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputBoxSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBoxSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
