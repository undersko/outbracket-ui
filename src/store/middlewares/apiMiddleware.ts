import axios from 'axios';

import {API, ERROR_CODES} from '@constants/api';

import getTokenInstance from '@controllers/TokenController';
import {AnyAction, Dispatch} from 'redux';
import {getAxiosRequestData} from '@helpers/apiHelpers';

function createApiMiddleware() {
  return ({dispatch}: {dispatch: Dispatch}) =>
    (next: any) =>
    (action: AnyAction) => {
      next(action);

      if (action.type !== API) {
        return;
      }
      const {
        url,
        method,
        data,
        cancelToken = '',
        types: {apiStart, apiSuccess, apiError, apiValidationError, apiEnd},
        onSuccess,
        onFailure,
        headers,
      } = action.payload;

      const accessTokenPromise = getTokenInstance(null).getToken();

      const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

      axios.defaults.baseURL = process.env.PUBLIC_URL || '';
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      axios.defaults.headers.common['Accept-Language'] = 'en-US';

      apiStart && dispatch({type: apiStart});

      const requestData = getAxiosRequestData(data, headers);

      return accessTokenPromise
        .then((accessToken) =>
          axios.request({
            url,
            method,
            headers: {...headers, Authorization: `Bearer ${accessToken}`},
            cancelToken,
            [dataOrParams]: requestData,
          }),
        )
        .then(({data}) => {
          switch (data.code) {
            case ERROR_CODES.SUCCESS:
              dispatch({type: apiSuccess, payload: data.result});
              onSuccess();
              break;
            case ERROR_CODES.ERROR:
              dispatch({type: apiError, payload: data.errorMessage});
              break;
            case ERROR_CODES.VALIDATION_ERROR:
              dispatch({type: apiValidationError, payload: data.validationResult});
              break;
          }
        })
        .catch((error) => {
          apiError && dispatch({type: apiError, payload: error});
          onFailure(error);
        })
        .finally(() => {
          apiEnd && dispatch({type: apiEnd});
        });
    };
}

const apiMiddleware = createApiMiddleware();

export default apiMiddleware;
