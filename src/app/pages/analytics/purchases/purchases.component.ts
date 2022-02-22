import { Component, OnInit, Input } from '@angular/core';

import { PurchaseCategory, Vendor } from '../../../core/models/dashboard.model';

@Component({
  selector: 'crm-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {

  @Input() vendors: Vendor[];
  @Input() purchase_categories: PurchaseCategory[];

  constructor() { }

  ngOnInit() {
  }

}
