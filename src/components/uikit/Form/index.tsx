import React, {FC, PropsWithChildren} from 'react';
import {FormProvider} from 'react-hook-form';

import {FormComponentProps} from '../shared/types';

const Form: FC<PropsWithChildren<FormComponentProps<any>>> = ({onSubmit, children, className, formMethods}) => {
  const {handleSubmit} = formMethods;
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
