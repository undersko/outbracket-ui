import React, {FC} from 'react';
import classNames from 'classnames';
import {useFormContext} from 'react-hook-form';
import {FormFieldComponentProps} from '../shared/types';
import HideComponent from '@shared/HideComponent';
import ErrorMessage from '@uikit/common/ErrorMessage';
import styles from './select.scss';
import ReactSelect from 'react-select';
import {Nullable, SelectValue} from '@declarations/shared';

type SelectProps = {
  options: {value: number; label: string}[];
  defaultValue?: Nullable<{value: number; label: string}>;
};

const Select: FC<FormFieldComponentProps & SelectProps> = ({
  name,
  validation,
  label,
  className,
  placeholder,
  showErrorMessage = true,
  theme = 'ribbon',
  options,
  defaultValue,
}) => {
  const {
    register,
    formState: {errors},
  } = useFormContext();

  const select = register(name, {...validation});
  return (
    <div className={className}>
      <HideComponent isHide={!label}>
        <div className={styles.label}>{label}</div>
      </HideComponent>
      <ReactSelect
        className={classNames(styles.selectContainer, theme && styles[theme])}
        placeholder={placeholder}
        options={options}
        {...select}
        onChange={(newValue: Nullable<SelectValue>) => {
          select.onChange({target: {value: newValue, name}});
        }}
        defaultValue={defaultValue}
      />
      <HideComponent isHide={!showErrorMessage}>
        <ErrorMessage text={errors[name]?.message as string ?? ''} />
      </HideComponent>
    </div>
  );
};

export default Select;
