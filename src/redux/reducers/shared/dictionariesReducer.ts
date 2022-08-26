import {AnyAction} from 'redux';
import {GET_COUNTRIES_REQUEST, GET_COUNTRIES_ERROR, GET_COUNTRIES_SUCCESS} from '@redux-types/shared/dictionaries';
import {DictionaryItem, ReducerState} from '@declarations/shared';
import {cloneDeep} from 'lodash';
import {buildReducer} from '@redux-actions/helpers';

const initialState: ReducerState<{countries: DictionaryItem[]}> = {
  countries: {
    data: [],
    state: {
      get: {
        isLoading: false,
        error: '',
      },
    },
  },
};

export default (state = initialState, action: AnyAction) => {
  let newState = cloneDeep(state);
  newState = buildReducer({
    state: newState,
    action,
    entityName: 'countries',
    actions: {
      get: [
        {
          request: GET_COUNTRIES_REQUEST,
          error: GET_COUNTRIES_ERROR,
          success: GET_COUNTRIES_SUCCESS,
        },
      ],
    },
  });
  return newState;
};
