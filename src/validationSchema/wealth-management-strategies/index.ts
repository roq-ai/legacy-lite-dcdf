import * as yup from 'yup';

export const wealthManagementStrategyValidationSchema = yup.object().shape({
  strategy: yup.string().required(),
  organization_id: yup.string().nullable(),
});
