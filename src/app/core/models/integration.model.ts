export class IntegrationType {
  id: number;
  name: string;
  img: string;
  label: string;
  details: any;
  flow_type: string;
}

export class IntegrationOAuth {
  name: string;
  url: string;
}

export class Integration {
  id: number;
  intg_type: string;
  intg_type_id: number;
  is_active: boolean;
  last_fetched: any;
  org_id: number;
  settings: IntegrationSetting;
}

export class IntegrationSetting {
  access_token: string;
  id: string;
  id_token: string;
  instance_url: string;
  issued_at: string;
  refresh_token: string;
  scope: string;
  signature: string;
  token_type: string;
}

export class IntegrationInfo {
  type: IntegrationType;
  integration: Integration
}
