import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationFormComponent } from './integration-form.component';
import { SchemaFormModule } from 'angular2-schema-form';
import {MaterialModule} from '../../../../shared/material/material.module';
import {MatDialogRef} from '@angular/material';
import {IntegrationService} from '../../../../core/services/integration.service';
import {HttpHelperService} from '../../../../core/helpers/http-helper.service';
import {SharedService} from '../../../../shared/services/shared.service';

class MatDialogRefMock {
}

class MockSharedService {
}


describe('IntegrationFormComponent', () => {
  let component: IntegrationFormComponent;
  let fixture: ComponentFixture<IntegrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationFormComponent ],
      imports: [
        SchemaFormModule,
        MaterialModule
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: IntegrationService, useClass: MockSharedService },
        { provide: HttpHelperService, useClass: MockSharedService },
        { provide: SharedService, useClass: MockSharedService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
