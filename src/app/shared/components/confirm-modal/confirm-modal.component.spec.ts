import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatDialogRef } from '@angular/material';

import { ConfirmModalComponent } from './confirm-modal.component';

class MatDialogRefMock {
}

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MaterialModule
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
