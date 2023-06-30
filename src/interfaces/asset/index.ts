import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface AssetInterface {
  id?: string;
  type: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface AssetGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  organization_id?: string;
}
