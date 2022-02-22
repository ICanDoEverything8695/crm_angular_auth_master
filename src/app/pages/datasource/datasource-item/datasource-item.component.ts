import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {DatasourceDetail, DSImage, DSKeyword} from '../../../core/models/datasource.model';
import { DatasourceService } from '../../../core/services/datasource.service';
import {SharedService} from '../../../shared/services/shared.service';

@Component({
  selector: 'crm-datasource-item',
  templateUrl: './datasource-item.component.html',
  styleUrls: ['./datasource-item.component.scss']
})
export class DatasourceItemComponent implements OnInit {

  detail: DatasourceDetail = new DatasourceDetail();
  keywords: DSKeyword[] = [];
  searchKeyword = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private datasourceService: DatasourceService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getDatasourceId();
  }

  private getDatasourceId(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.datasourceService.getDatasourceById(params['id']).subscribe((res: DatasourceDetail) => {
          this.detail = res;
        });

        this.datasourceService.getKeywords(params['id']).subscribe((res: DSKeyword[]) => {
          this.keywords = res;
        });
      }
    });
  }

}
