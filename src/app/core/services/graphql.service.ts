import { Injectable } from '@angular/core';

import { GraphQLClient } from 'graphql-request'
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../../environments/environment';

import { AnalyticsFitler } from '../models/analytic_filter.model';

@Injectable()
export class GraphqlService {

  client;

  constructor(
    private localStorageService: LocalStorageService
  ) {
  }

  async getAllVerticals(): Promise<any> {
    const query = `
      {
        buyers (
          group: ["vertical"],
          order: ["vertical"]
        ) {
          vertical
        }
      }`;
    return this.graphqClientInitialize().request(query);
  }

  async getVendors(filter: AnalyticsFitler) {

    const query = `
      {
        transactions (
          ${this.buildFilter(filter)}
          group: ["product_manufacturerName"],
          order: ["avgAmount"],
          last: 999999
        ) {
          avgAmount: func(field: "totalAmount", op: "avg"),
          product_manufacturerName
        }
      }
    `;
    return this.graphqClientInitialize().request(query);
  }

  async getPurchaseCategories(filter: AnalyticsFitler) {
    let group_arg = '';
    if (filter.buyer_verticals.length) {
      group_arg = `group: ["buyer_vertical", "product_category"],`;
    } else {
      group_arg = `group: ["product_category"],`;
    }
    const query = `
      {
        transactions (
          ${this.buildFilter(filter)}
          ${group_arg}
          order: ["avgAmount"],
          last: 999999
        ) {
          avgAmount: func(field: "totalAmount", op: "avg"),
          product_category
        }
      }
    `;
    return this.graphqClientInitialize().request(query);
  }

  async getTotalPurchases(filter: AnalyticsFitler) {
    const query = `
      {
        transactions (
          ${this.buildFilter(filter)}
        ) {
          totalSum: func(field: "totalAmount", op: "sum"),
        }
      }
    `;
    return this.graphqClientInitialize().request(query);
  }

  async getTotalPurchasesGraphData(filter: AnalyticsFitler) {
    const query = `
      {
        transactions (
          ${this.buildFilter(filter)}
          group: ["dateGroup"],
          order: ["dateGroup"]
        ) {
          avgAmount: func(field: "totalAmount", op: "avg"),
          dateGroup: func(
            field: "orderTime", op: "date_trunc", args: ["month"]
          )
        }
      }
    `;
    return this.graphqClientInitialize().request(query);
  }

  graphqClientInitialize() {
    let token = this.localStorageService.get(environment.localStorage.token);

    return this.client = new GraphQLClient('api/graphql', {
      credentials: 'include',
      mode: 'cors',
      headers: {
        Authorization: `Jwt ${token}`,
      }
    });
  }

  private buildFilter(filter: AnalyticsFitler): string {
    let buyer_verticals = '';
    let buyer_marketCap = '';
    let buyer_numberOfEmployees = '';
    if (filter.buyer_verticals.length) {
      buyer_verticals = `buyer_verticals: ${JSON.stringify(filter.buyer_verticals)},`;
    }
    if (filter.buyer_marketCap.greaterThan !== 0 && filter.buyer_marketCap.lessThan !== 1000000000) {
      buyer_marketCap = `buyer_marketCap: {greaterThan: ${filter.buyer_marketCap.greaterThan}, lessThan: ${filter.buyer_marketCap.lessThan}},`;
    }
    if (filter.buyer_numberOfEmployees.greaterThan !== 0 && filter.buyer_numberOfEmployees.lessThan !== 10000) {
      buyer_numberOfEmployees = `buyer_numberOfEmployees: {greaterThan: ${filter.buyer_numberOfEmployees.greaterThan}, lessThan: ${filter.buyer_numberOfEmployees.lessThan}},`;
    }
    const filterString = `
        filters: {
          ${buyer_verticals}
          ${buyer_marketCap}
          ${buyer_numberOfEmployees}
          orderTime: {}
        },
    `;
    return filterString;
  }
}
