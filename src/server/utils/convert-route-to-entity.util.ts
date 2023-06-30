const mapping: Record<string, string> = {
  assets: 'asset',
  'financial-data': 'financial_data',
  organizations: 'organization',
  users: 'user',
  'wealth-management-strategies': 'wealth_management_strategy',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
