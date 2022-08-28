import {FieldValues, UseFormReturn} from 'react-hook-form';
import {ReactNode, MouseEvent} from 'react';
import {RegisterOptions} from 'react-hook-form/dist/types/validator';

export declare type SubmitHandler<TFieldValues extends FieldValues = FieldValues> = (
  data: TFieldValues,
) => any;

export type Theme = 'default' | 'ribbon';

export declare type ActionDropDownOption = {
  id: number;
  element: string | ReactNode;
};

export interface FormFieldComponentProps {
  name: string;
  type?: string;
  validation?: RegisterOptions;
  label?: string;
  theme?: Theme;
  className?: string;
  placeholder?: string;
  showErrorMessage?: boolean;
}

export interface FormComponentProps<TFieldValues extends FieldValues> {
  onSubmit: SubmitHandler<TFieldValues>;
  className?: string;
  formMethods: UseFormReturn<TFieldValues>;
}

export interface ButtonComponentProps {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  onClick?: () => void;
}

export interface ErrorMessageComponentProps {
  text: string | undefined;
}

export interface ActionDropDownComponentProps {
  onAction: (e: MouseEvent<HTMLLIElement>, actionId: number) => void;
  className: string;
  options: ActionDropDownOption[];
}
