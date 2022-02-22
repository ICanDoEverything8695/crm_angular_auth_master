import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GraphqlService } from '../../core/services/graphql.service';
import { SharedService } from '../../shared/services/shared.service';

import { AnalyticsFitler, Vertical } from '../../core/models';
import { PurchaseCategory, TotalPurchases, TotalPurchasesGraphSchema, Vendor } from '../../core/models/dashboard.model';

@Component({
  selector: 'crm-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  verticals: Vertical[] = [];
  vendors: Vendor[] = [];
  purchase_categories: PurchaseCategory[] = [];

  showMobileSidebar = false;
  totalPurchases: TotalPurchases;
  totalPurchasesGraphData: TotalPurchasesGraphSchema[] = [];

  analytics_filter: AnalyticsFitler = new AnalyticsFitler();

  isLoading = false;

  constructor(
    private graphQlService: GraphqlService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getVerticals();
    this.filterChanged();
  }

  filterChanged(): void {
    this.getVendors(this.analytics_filter);
    this.getTotalPurchases(this.analytics_filter);
    this.getPurchaseCategories(this.analytics_filter);
  }

  private getVerticals(): void {
    this.graphQlService.getAllVerticals().then((res: any) => {
      this.verticals = res.buyers;
    }, (err) => {
      this.sharedService.showSuccessMessage('Sorry, Something went wrong while fetching verticals data.')
    });
  }

  private getPurchaseCategories(filter: AnalyticsFitler): void {
    this.graphQlService.getPurchaseCategories(filter).then((res: any) => {
      this.purchase_categories = res.transactions;
    }, (err: any) => {
      this.sharedService.showSuccessMessage('Sorry, Something went wrong while fetching Total Purchase Categories data.')
    });
  }

  private getTotalPurchases(filter: AnalyticsFitler): void {
    this.graphQlService.getTotalPurchases(filter).then((res: any) => {
      this.totalPurchases = res.transactions[0];
    }, (err) => {
      this.sharedService.showSuccessMessage('Sorry, Something went wrong while fetching Total Purchase data.')
    });
    this.isLoading = true;
    this.graphQlService.getTotalPurchasesGraphData(filter).then((res: any) => {
      this.totalPurchasesGraphData = res.transactions;
      this.totalPurchasesGraphData.map(x => {
        x.dateFormatted = moment(x.dateGroup).format('ll');
      });
      this.isLoading = false;
    }, (err) => {
      this.sharedService.showSuccessMessage('Sorry, Something went wrong while fetching Total Purchase Graph data.')
    });
  }

  private getVendors(filter: AnalyticsFitler): void {
    this.graphQlService.getVendors(filter).then((res: any) => {
      this.vendors = res.transactions;
    }, (err) => {
      this.sharedService.showSuccessMessage('Sorry, Something went wrong while fetching Vendors data.')
    });
  }

}
