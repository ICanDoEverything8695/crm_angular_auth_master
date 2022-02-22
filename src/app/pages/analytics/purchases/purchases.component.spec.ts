import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseCategory, Vendor } from '../../../core/models/dashboard.model';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { MatCardModule } from '@angular/material';

import { PurchasesComponent } from './purchases.component';

describe('PurchasesComponent', () => {
  let component: PurchasesComponent;
  let fixture: ComponentFixture<PurchasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatCardModule, PipesModule ],
      providers: [ PurchaseCategory, Vendor ],
      declarations: [ PurchasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
