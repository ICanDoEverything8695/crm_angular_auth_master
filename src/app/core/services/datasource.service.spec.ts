import {TestBed, inject, fakeAsync, discardPeriodicTasks} from '@angular/core/testing';

import { DatasourceService } from './datasource.service';
import { MockHttpHelper } from './mock.services';
import { HttpHelperService } from '../helpers/http-helper.service';
import { Datasource } from '../models/datasource.model';

describe('DatasourceService', () => {
  let dataSourceService: DatasourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatasourceService,
        {provide: HttpHelperService, useClass: MockHttpHelper}
      ]
    });
  });

  beforeEach(() => {
    dataSourceService = TestBed.get(DatasourceService);
  });

  it('should be created', inject([DatasourceService], (service: DatasourceService) => {
    expect(service).toBeTruthy();
  }));

  it('getDatasourceById function should get valid response', fakeAsync(() => {
    let retVal = null;
    dataSourceService.getDatasourceById(1).subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getDatasources function should get valid response', fakeAsync(() => {
    let retVal = null;
    dataSourceService.getDatasources().subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getDatasourceListByPage function should get valid response', fakeAsync(() => {
    let retVal = null;
    dataSourceService.getDatasourceListByPage(1, 1, 'ex', 'ex').subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getImagesFromDatasource function should get valid response', fakeAsync(() => {
    let retVal = null;
    dataSourceService.getImagesFromDatasource(1).subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('createDatasource function should get valid response', fakeAsync(() => {
    let retVal = null;
    dataSourceService.createDatasource(new Datasource()).subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('editDatasource function should get valid response', fakeAsync(() => {
    let retVal = null;
    dataSourceService.editDatasource(new Datasource()).subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getKeywords function should get valid response', fakeAsync(() => {
    let retVal = null;
    dataSourceService.getKeywords(1).subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('deleteImage function should get valid response', fakeAsync(() => {
    let retVal = null;
    dataSourceService.deleteImage(1).subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));
});
