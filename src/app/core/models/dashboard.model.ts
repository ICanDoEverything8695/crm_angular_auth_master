export class Vendor {
  product_manufacturerName: string;
  avgAmount: number;
}

export class PurchaseCategory {
  product_category: string;
  avgAmount: number;
}

export class TotalPurchases {
  totalSum: number;
}

export class TotalPurchasesGraphSchema {
  avgAmount: number;
  dateGroup: string;
  dateFormatted: string;
}
