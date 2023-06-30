import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface WealthManagementStrategyInterface {
  id?: string;
  strategy: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface WealthManagementStrategyGetQueryInterface extends GetQueryInterface {
  id?: string;
  strategy?: string;
  organization_id?: string;
}
