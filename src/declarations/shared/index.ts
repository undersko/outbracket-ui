export type Nullable<T> = T | null;

export type ValidationError = {
  code: string;
  message: string;
};

export type EntityReducerStateAction = 'get' | 'post' | 'patch' | 'put' | 'delete';
export type EntityReducerAction = 'request' | 'success' | 'error' | 'validationErrors';

export type ReduxActionParameters<T = undefined> = {
  data?: T;
  onSuccess?: () => void;
  onFailure?: () => void;
};

export type EntityReducerActionState = {
  isLoading: boolean;
  error: string;
  validationErrors?: ValidationError[];
};

export type EntityReducerState = {
  [key in EntityReducerStateAction]?: EntityReducerActionState;
};

export type EntityReducerActions = {
  [key in EntityReducerStateAction]?: {
    [key in EntityReducerAction]?: string;
  }[];
};

export type ReducerState<T> = {
  [key in keyof T]: {
    data: T[key];
    state: EntityReducerState;
  };
};

export type DictionaryItem = {
  id: number;
  name: string;
};

export type SelectValue = {
  value: number;
  label: string;
};
