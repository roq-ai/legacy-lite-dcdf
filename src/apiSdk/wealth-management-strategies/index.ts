import axios from 'axios';
import queryString from 'query-string';
import {
  WealthManagementStrategyInterface,
  WealthManagementStrategyGetQueryInterface,
} from 'interfaces/wealth-management-strategy';
import { GetQueryInterface } from '../../interfaces';

export const getWealthManagementStrategies = async (query?: WealthManagementStrategyGetQueryInterface) => {
  const response = await axios.get(
    `/api/wealth-management-strategies${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const createWealthManagementStrategy = async (wealthManagementStrategy: WealthManagementStrategyInterface) => {
  const response = await axios.post('/api/wealth-management-strategies', wealthManagementStrategy);
  return response.data;
};

export const updateWealthManagementStrategyById = async (
  id: string,
  wealthManagementStrategy: WealthManagementStrategyInterface,
) => {
  const response = await axios.put(`/api/wealth-management-strategies/${id}`, wealthManagementStrategy);
  return response.data;
};

export const getWealthManagementStrategyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/wealth-management-strategies/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteWealthManagementStrategyById = async (id: string) => {
  const response = await axios.delete(`/api/wealth-management-strategies/${id}`);
  return response.data;
};
