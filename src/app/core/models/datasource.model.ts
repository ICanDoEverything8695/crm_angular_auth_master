export class Datasource {
  id: number;
  url: string;
  title: string;
  created_by: string;
  updated_by: string;
}

export class Pagination {
  next: string;
  page: number;
  pages: number;
  previous: string;
  total: number;
  results: Datasource[];
}

export class DatasourceDetail {
  id: number;
  image: string;
  images: number;
  is_training: boolean;
  last_state_change: string;
  new_keywords: number;
  samples: number;
  state: string;
  state_changes: number;
  title: string;
  updated_by: string;
  url: string;
  were_approved: number;
  were_disapproved: number;
  approved: number;
  disapproved: number;
  created_by: string;
}

export class DSKeyword {
  datasource: number;
  id: number;
  name: string;
  tag: string;
  state: string;
}

export class DSImage {
  id: number;
  name: string;
  url: string;
  height: number;
  width: number;
}
