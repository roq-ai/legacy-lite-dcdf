import * as yup from 'yup';

export const assetValidationSchema = yup.object().shape({
  type: yup.string().required(),
  organization_id: yup.string().nullable(),
});
