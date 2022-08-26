import {GET_COUNTRIES_REQUEST, GET_COUNTRIES_ERROR, GET_COUNTRIES_SUCCESS} from '@redux-types/shared/dictionaries';

import {API} from '@constants/api';

import {NOOP} from '@constants/noop';

import SHARED_ENDPOINTS from '../../../endpoints/shared';
import {ReduxActionParameters} from '@declarations/shared';

export const getCountries = ({onSuccess = NOOP, onFailure = NOOP}: ReduxActionParameters) => {
  return {
    type: API,
    payload: {
      url: SHARED_ENDPOINTS.dictionary.countries,
      method: 'GET',
      types: {
        apiStart: GET_COUNTRIES_REQUEST,
        apiSuccess: GET_COUNTRIES_SUCCESS,
        apiError: GET_COUNTRIES_ERROR,
      },
      onSuccess,
      onFailure,
    },
  };
};
