import { AssetInterface } from 'interfaces/asset';
import { FinancialDataInterface } from 'interfaces/financial-data';
import { WealthManagementStrategyInterface } from 'interfaces/wealth-management-strategy';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  asset?: AssetInterface[];
  financial_data?: FinancialDataInterface[];
  wealth_management_strategy?: WealthManagementStrategyInterface[];
  user?: UserInterface;
  _count?: {
    asset?: number;
    financial_data?: number;
    wealth_management_strategy?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
