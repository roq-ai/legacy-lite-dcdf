import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createWealthManagementStrategy } from 'apiSdk/wealth-management-strategies';
import { Error } from 'components/error';
import { wealthManagementStrategyValidationSchema } from 'validationSchema/wealth-management-strategies';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { WealthManagementStrategyInterface } from 'interfaces/wealth-management-strategy';

function WealthManagementStrategyCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: WealthManagementStrategyInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createWealthManagementStrategy(values);
      resetForm();
      router.push('/wealth-management-strategies');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<WealthManagementStrategyInterface>({
    initialValues: {
      strategy: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: wealthManagementStrategyValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Wealth Management Strategy
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="strategy" mb="4" isInvalid={!!formik.errors?.strategy}>
            <FormLabel>Strategy</FormLabel>
            <Input type="text" name="strategy" value={formik.values?.strategy} onChange={formik.handleChange} />
            {formik.errors.strategy && <FormErrorMessage>{formik.errors?.strategy}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'wealth_management_strategy',
    operation: AccessOperationEnum.CREATE,
  }),
)(WealthManagementStrategyCreatePage);
