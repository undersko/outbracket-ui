import React, {FC} from 'react';
import classNames from 'classnames';
import {useFormContext} from 'react-hook-form';
import {FormFieldComponentProps} from '../shared/types';
import HideComponent from '@shared/HideComponent';
import ErrorMessage from '@uikit/common/ErrorMessage';
import styles from './input.scss';
import {Nullable} from '@declarations/shared';

type InputProps = {
  defaultValue?: Nullable<string>;
};

const Input: FC<FormFieldComponentProps & InputProps> = ({
  name,
  validation,
  label,
  className,
  placeholder,
  defaultValue,
  showErrorMessage = true,
  type = 'text',
  theme = 'ribbon',
}) => {
  const {
    register,
    formState: {errors},
  } = useFormContext();

  return (
    <div className={className}>
      <HideComponent isHide={!label}>
        <div className={styles.label}>{label}</div>
      </HideComponent>
      <div className={styles.inputContainer}>
        <input
          className={classNames(styles.formControl, theme && styles[theme])}
          placeholder={placeholder}
          type={type}
          {...register(name, {...validation})}
          defaultValue={defaultValue || undefined}
        />
      </div>
      <HideComponent isHide={!showErrorMessage}>
        <ErrorMessage text={errors[name]?.message as string ?? ''} />
      </HideComponent>
    </div>
  );
};

export default Input;
