export class AnalyticsFitler {
  buyer_verticals: string[];
  buyer_marketCap: BuyerMarketCap;
  buyer_numberOfEmployees: BuyerNumberOfEmployees;

  constructor() {
    this.buyer_verticals = [];
    this.buyer_marketCap = new BuyerMarketCap();
    this.buyer_numberOfEmployees = new BuyerNumberOfEmployees();
  }
}

export class BuyerMarketCap {
  greaterThan: number;
  lessThan: number;

  constructor() {
    this.greaterThan = 0;
    this.lessThan = 1000000000;
  }
}

export class BuyerNumberOfEmployees {
  greaterThan: number;
  lessThan: number;

  constructor() {
    this.greaterThan = 0;
    this.lessThan = 10000
  }
}
