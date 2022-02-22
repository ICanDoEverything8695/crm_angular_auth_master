import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

import { DatasourceService } from '../../core/services/datasource.service';
import { Datasource, Pagination } from '../../core/models/datasource.model';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'crm-datasource',
  templateUrl: './datasource.component.html',
  styleUrls: ['./datasource.component.scss']
})
export class DatasourceComponent implements OnInit {

  // MatPaginator Inputs
  pageSizeOptions = [5, 10, 25, 100];

  length = 0;
  pageSize = 10;
  pageIndex = 0;

  titleKeyword = '';
  urlKeyword = '';
  timer: any = [];

  datas: Datasource[] = [];

  constructor(
    private datasourceService: DatasourceService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getDatasources();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onChangePage(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.datasourceService.getDatasourceListByPage(this.pageIndex + 1, this.pageSize, this.titleKeyword, this.urlKeyword).subscribe(res => {
      this.getPaginationData(res);
    });
  }

  changeFilter(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
    const instance = this;
    this.timer = setInterval(
      function(){
        instance.getDatasources();
        clearInterval(instance.timer);
      }, 800);
  }

  private getDatasources(): void {
    this.datasourceService.getDatasourceListByPage(1, this.pageSize, this.titleKeyword, this.urlKeyword).subscribe((res: Pagination) => {
      this.getPaginationData(res);
    }, err => {
      this.sharedService.showSuccessMessage('Sorry, failed to get datasource data.');
    });
  }

  private getPaginationData(res: Pagination) {
    this.length = res.total;
    this.pageIndex = res.page - 1;
    this.datas = res.results;
  }

}
