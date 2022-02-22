import { Injectable } from '@angular/core';

import { HttpHelperService } from '../helpers/http-helper.service';
import { environment } from '../../../environments/environment';
import { Datasource } from '../models/datasource.model';

@Injectable()
export class DatasourceService {

  constructor(
    private http: HttpHelperService
  ) { }

  getDatasourceById(id) {
    const url = environment.baseAPIUrl + 'datasources/' + id;
    return this.http.get(url, null, true, null)
      .map(x => x.json())
  }

  getDatasources() {
    const url = environment.baseAPIUrl + 'datasources/';
    return this.http.get(url, null, true, null)
      .map(x => x.json())
  }

  getDatasourceListByPage(page, count, keyTitle, keyUrl) {
    const body = {};
    if (keyUrl) {
      body['url'] = keyUrl;
    }
    if (keyTitle) {
      body['title'] = keyTitle;
    }
    const url = environment.baseAPIUrl + 'datasources/paginate/' + page + '/' + count;
    return this.http.get(url, body, true, null)
      .map(x => x.json())
  }

  getImagesFromDatasource(id) {
    const url = environment.baseAPIUrl + 'datasources/' + id + '/images';
    return this.http.get(url, null, true, null)
      .map(x => x.json())
  }

  createDatasource(body: Datasource) {
    const url = environment.baseAPIUrl + 'datasources/';
    return this.http.post(url, body, false, true, null)
      .map(x => x)
  }

  editDatasource(body: Datasource) {
    const url = environment.baseAPIUrl + 'datasource/' + body.id;
    const req_body = body;
    delete req_body.id;
    return this.http.put(url, req_body, false, true, null)
      .map(x => x)
  }

  getKeywords(id) {
    const url = environment.baseAPIUrl + 'datasources/' + id + '/keywords?state=1';
    return this.http.get(url, null, true, null)
      .map(x => x.json())
  }

  deleteImage(id) {
    const url = environment.baseAPIUrl + 'images/' + id;
    return this.http.delete(url, false, true, null)
      .map(x => x);
  }

}
