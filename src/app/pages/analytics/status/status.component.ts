import { Component, OnInit, Input } from '@angular/core';
import { TotalPurchases, TotalPurchasesGraphSchema } from '../../../core/models/dashboard.model';

@Component({
  selector: 'crm-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent implements OnInit{

  @Input() totalPurchases: TotalPurchases;
  @Input() totalPurchasesGraphData: TotalPurchasesGraphSchema[];

  legend = {visible: false};

  constructor() {

  }

  ngOnInit(): void {
  }

  onValueChanged(e) {
  }
}
