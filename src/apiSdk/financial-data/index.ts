import axios from 'axios';
import queryString from 'query-string';
import { FinancialDataInterface, FinancialDataGetQueryInterface } from 'interfaces/financial-data';
import { GetQueryInterface } from '../../interfaces';

export const getFinancialData = async (query?: FinancialDataGetQueryInterface) => {
  const response = await axios.get(`/api/financial-data${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFinancialData = async (financialData: FinancialDataInterface) => {
  const response = await axios.post('/api/financial-data', financialData);
  return response.data;
};

export const updateFinancialDataById = async (id: string, financialData: FinancialDataInterface) => {
  const response = await axios.put(`/api/financial-data/${id}`, financialData);
  return response.data;
};

export const getFinancialDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/financial-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFinancialDataById = async (id: string) => {
  const response = await axios.delete(`/api/financial-data/${id}`);
  return response.data;
};
