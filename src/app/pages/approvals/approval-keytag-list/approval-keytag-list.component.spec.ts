import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgPipesModule } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../shared/material/material.module';

import { ApprovalKeytagListComponent } from './approval-keytag-list.component';

describe('ApprovalKeytagListComponent', () => {
  let component: ApprovalKeytagListComponent;
  let fixture: ComponentFixture<ApprovalKeytagListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalKeytagListComponent ],
      imports: [MaterialModule, BrowserAnimationsModule, NgPipesModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalKeytagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
