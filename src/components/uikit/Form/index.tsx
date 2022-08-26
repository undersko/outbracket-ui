import React, {FC} from 'react';
import {FormProvider} from 'react-hook-form';

import {FormComponentProps} from '../shared/types';

const Form: FC<FormComponentProps<any>> = ({onSubmit, children, className, formMethods}) => {
  const {handleSubmit, getValues} = formMethods;
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
