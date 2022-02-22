import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

import { Vertical, AnalyticsFitler } from '../../../core/models';
import { BuyerMarketCap } from '../../../core/models/analytic_filter.model';
import { BuyerNumberOfEmployees } from '../../../core/models/analytic_filter.model';

@Component({
  selector: 'crm-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  @Input() verticals: Vertical[];
  @Input() analytics_filter: AnalyticsFitler;

  @Output() onFilterChange: EventEmitter<any> = new EventEmitter<any>();

  tooltipMarketCap: any;
  tooltipEmployees: any;
  label: any;
  tooltipEnabled: any;
  timer: any = [];

  constructor() {
    this.tooltipMarketCap = {
      enabled: true,
      format: 'millions',
      showMode: 'always',
      position: 'bottom'
    };
    this.tooltipEmployees = {
      enabled: true,
      format: 'thousands',
      showMode: 'always',
      position: 'bottom'
    };
    this.tooltipEnabled = {
      enabled: true
    };
    this.label = {
      visible: true,
      format: (value) => {
        return this.limitStage(value)
      },
      position: 'top'
    };
  }

  ngOnInit() {
  }

  showHint(): void {
    this.trigger.openMenu();
  }

  onVerticalFilterChange(value): void {
    this.setVerticalFilter();
    this.onFilterChange.emit();
  }

  onRangeSliderFilterChanged(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
    const instance = this;
    this.timer = setInterval(
      function(){
        instance.onFilterChange.emit();
        clearInterval(instance.timer);
      }, 500);
  }

  onResetCompanySizeFilter(isMarketCap: boolean): void {
    if (isMarketCap) {
      this.analytics_filter.buyer_marketCap = new BuyerMarketCap();
    } else {
      this.analytics_filter.buyer_numberOfEmployees = new BuyerNumberOfEmployees();
    }
    this.onFilterChange.emit();
  }

  limitStage(value) {
    if (value === 1000000000) {
      return '1B+'
    } else if (value === 10000) {
      return '10K+'
    } else {
      return value;
    }
  }

  private setVerticalFilter(): void {
    this.analytics_filter.buyer_verticals = [];
    this.verticals.forEach((vertical: Vertical) => {
      if (vertical.value) {
        this.analytics_filter.buyer_verticals.push(vertical.vertical);
      }
    });
  }
}
