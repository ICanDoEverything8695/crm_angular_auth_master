export class Organization {

  name: string;
  organization_type_id: number;
  org_type_id: number;
  org_type_name: string;
  street_number: string;
  street_name: string;
  city: string;
  state: string;
  state_code: string;
  postal_code: string;
  country: string;
  country_code: string;
  lat: string;
  lng: string;
  is_deleted: boolean;
  id: number;

  constructor() {
    this.name = '';
    this.organization_type_id = 0;
  }
}
