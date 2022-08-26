import {AnyAction} from 'redux';
import {cloneDeep} from 'lodash';
import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_ERROR,
  GET_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_ERROR,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_VALIDATION_ERROR,
  UPLOAD_USER_LOGO_REQUEST,
  UPLOAD_USER_LOGO_SUCCESS,
  UPLOAD_USER_LOGO_ERROR,
  DELETE_USER_LOGO_REQUEST,
  DELETE_USER_LOGO_ERROR,
  DELETE_USER_LOGO_SUCCESS,
  GET_USER_SETTINGS_REQUEST,
  GET_USER_SETTINGS_ERROR,
  GET_USER_SETTINGS_SUCCESS,
} from '@redux-types/profile';
import {UserProfile} from '@declarations/profile';
import {ReducerState} from '@declarations/shared';
import {buildReducer} from '@redux-actions/helpers';

const initialState: ReducerState<{userProfile: UserProfile}> = {
  userProfile: {
    data: {
      id: '',
      bio: '',
      country: null,
      email: '',
      username: '',
      imageId: '',
      userSettingsId: '',
      settings: {crop: null},
    },
    state: {
      get: {
        isLoading: false,
        error: '',
      },
      patch: {
        isLoading: false,
        error: '',
        validationErrors: [],
      },
      delete: {
        isLoading: false,
        error: '',
        validationErrors: [],
      },
    },
  },
};

export default (state = initialState, action: AnyAction) => {
  let newState = cloneDeep(state);
  newState = buildReducer({
    state: newState,
    action,
    entityName: 'userProfile',
    actions: {
      get: [
        {
          request: GET_USER_INFO_REQUEST,
          error: GET_USER_INFO_ERROR,
          success: GET_USER_INFO_SUCCESS,
        },
        {
          request: GET_USER_SETTINGS_REQUEST,
          error: GET_USER_SETTINGS_ERROR,
          success: GET_USER_SETTINGS_SUCCESS,
        },
      ],
      patch: [
        {
          request: UPDATE_USER_INFO_REQUEST,
          error: UPDATE_USER_INFO_ERROR,
          success: UPDATE_USER_INFO_SUCCESS,
          validationErrors: UPDATE_USER_INFO_VALIDATION_ERROR,
        },
        {
          request: UPLOAD_USER_LOGO_REQUEST,
          error: UPLOAD_USER_LOGO_ERROR,
          success: UPLOAD_USER_LOGO_SUCCESS,
        },
      ],
      delete: [
        {
          request: DELETE_USER_LOGO_REQUEST,
          error: DELETE_USER_LOGO_ERROR,
          success: DELETE_USER_LOGO_SUCCESS,
        },
      ],
    },
  });
  return newState;
};
