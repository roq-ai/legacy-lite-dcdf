import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface FinancialDataInterface {
  id?: string;
  data: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface FinancialDataGetQueryInterface extends GetQueryInterface {
  id?: string;
  data?: string;
  organization_id?: string;
}
