import React, {FC, TextareaHTMLAttributes} from 'react';
import classNames from 'classnames';
import {useFormContext} from 'react-hook-form';
import {FormFieldComponentProps} from '../shared/types';
import HideComponent from '@shared/HideComponent';
import ErrorMessage from '@uikit/common/ErrorMessage';
import styles from './textarea.scss';
import {Nullable} from '@declarations/shared';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  defaultValue?: Nullable<string>;
};

const Textarea: FC<FormFieldComponentProps & TextareaProps> = ({
  name,
  validation,
  label,
  className,
  placeholder,
  defaultValue,
  showErrorMessage = true,
  theme = 'ribbon',
  ...rest
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
      <div className={styles.textareaContainer}>
        <textarea
          className={classNames(styles.formControl, theme && styles[theme])}
          placeholder={placeholder}
          {...register(name, {...validation})}
          defaultValue={defaultValue || undefined}
          {...rest}
        />
      </div>
      <HideComponent isHide={!showErrorMessage}>
        <ErrorMessage text={errors[name]?.message as string ?? ''} />
      </HideComponent>
    </div>
  );
};

export default Textarea;
