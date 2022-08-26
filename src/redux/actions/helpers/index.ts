import {AnyAction} from 'redux';
import {EntityReducerActions, EntityReducerStateAction} from '@declarations/shared';

export const buildReducer = ({
  state,
  action,
  entityName,
  actions,
}: {
  state: any;
  action: AnyAction;
  entityName: string;
  actions: EntityReducerActions;
}) => {
  Object.keys(actions).forEach((actionKey) => {
    if (actions[actionKey as EntityReducerStateAction]?.findIndex((act) => act.request === action.type) !== -1) {
      state[entityName].state[actionKey] = {
        isLoading: true,
        error: '',
        validationErrors: [],
      };
    }
    if (actions[actionKey as EntityReducerStateAction]?.findIndex((act) => act.success === action.type) !== -1) {
      state[entityName].state[actionKey] = {
        isLoading: false,
        error: '',
      };
      state[entityName].data = {...state[entityName].data, ...action.payload};
    }
    if (actions[actionKey as EntityReducerStateAction]?.findIndex((act) => act.error === action.type) !== -1) {
      state[entityName].state[actionKey] = {
        isLoading: false,
        error: action.payload,
      };
    }
    if (
      actions[actionKey as EntityReducerStateAction]?.findIndex((act) => act.validationErrors === action.type) !== -1
    ) {
      state[entityName].state[actionKey] = {
        isLoading: false,
        error: '',
        validationErrors: action.payload,
      };
    }
  });
  return state;
};
