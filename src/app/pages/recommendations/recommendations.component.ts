import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'crm-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  dummy: Array<number> = [];

  constructor() { }

  ngOnInit() {
    this.generateDummyData();
  }

  private generateDummyData(): void {
    for (let i = 0; i < 6; i++) {
      this.dummy.push(i);
    }
  }
}
