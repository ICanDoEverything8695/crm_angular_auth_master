import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsComponent } from './recommendations.component';
import { ExpansionPanelsModule } from 'ng2-expansion-panels'

describe('RecommendationsComponent', () => {
  let component: RecommendationsComponent;
  let fixture: ComponentFixture<RecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ExpansionPanelsModule ],
      declarations: [ RecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
