import {FieldPath} from 'react-hook-form';
import {DictionaryItem, Nullable, SelectValue, ValidationError} from '@declarations/shared';

type ManualValidationError<FieldValues> = [FieldPath<FieldValues>, {type: string; message: string}];

export const getManualValidationErrors = <FieldValues>(
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
      ] as ManualValidationError<FieldValues>[];
    }
    return acc;
  }, [] as ManualValidationError<FieldValues>[]);
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
