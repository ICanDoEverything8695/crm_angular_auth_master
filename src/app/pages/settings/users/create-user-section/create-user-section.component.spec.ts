import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/material/material.module';

import { CreateUserSectionComponent } from './create-user-section.component';

describe('CreateUserSectionComponent', () => {
  let component: CreateUserSectionComponent;
  let fixture: ComponentFixture<CreateUserSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserSectionComponent ],
      schemas: [],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
