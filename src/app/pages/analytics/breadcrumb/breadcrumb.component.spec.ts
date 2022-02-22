import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbComponent } from './breadcrumb.component';
import {MaterialModule} from '../../../shared/material/material.module';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbComponent ],
      imports: [MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
