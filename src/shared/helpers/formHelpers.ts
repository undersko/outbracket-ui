import {FieldPath, FieldValues} from 'react-hook-form';
import {DictionaryItem, Nullable, SelectValue, ValidationError} from '@declarations/shared';

type ManualValidationError<TFieldValues extends FieldValues> = [
  FieldPath<TFieldValues>,
  {type: string; message: string},
];

export const getManualValidationErrors = <TFieldValues extends FieldValues>(
  errors: ValidationError[],
  errorsMap: {[key: string]: string},
) => {
  if (!errors || !errorsMap) {
    return null;
  }
  return errors.reduce((acc, error) => {
    if (error && error.code && errorsMap.hasOwnProperty(error.code)) {
      return [
        ...acc,
        [errorsMap[error.code], {type: 'manual', message: error.message}],
      ] as ManualValidationError<TFieldValues>[];
    }
    return acc;
  }, [] as ManualValidationError<TFieldValues>[]);
};

export const formatSelectOption = (option: Nullable<DictionaryItem>): Nullable<SelectValue> => {
  return option ? {value: option.id, label: option.name} : null;
};

export const formatSelectOptions = (options: DictionaryItem[]) => {
  return options.map((option) => ({value: option.id, label: option.name}));
};

export const formatDictionaryItem = (option: Nullable<SelectValue>): Nullable<DictionaryItem> => {
  return option ? {id: option.value, name: option.label} : null;
};
