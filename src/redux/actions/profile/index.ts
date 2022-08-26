import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_ERROR,
  GET_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_ERROR,
  UPDATE_USER_INFO_VALIDATION_ERROR,
  UPLOAD_USER_LOGO_REQUEST,
  UPLOAD_USER_LOGO_SUCCESS,
  UPLOAD_USER_LOGO_ERROR,
  DELETE_USER_LOGO_REQUEST,
  DELETE_USER_LOGO_SUCCESS,
  DELETE_USER_LOGO_ERROR,
  GET_USER_SETTINGS_REQUEST,
  GET_USER_SETTINGS_SUCCESS,
  GET_USER_SETTINGS_ERROR,
} from '@redux-types/profile';

import {API} from '@constants/api';

import {NOOP} from '@constants/noop';

import PROFILE_ENDPOINTS from '../../../endpoints/profile';
import {UserProfile} from '@declarations/profile';
import {ReduxActionParameters} from '@declarations/shared';
import pupa from 'pupa';

export const getUserInfo = ({onSuccess = NOOP, onFailure = NOOP}: ReduxActionParameters) => {
  return {
    type: API,
    payload: {
      url: PROFILE_ENDPOINTS.GET_USER_INFO,
      method: 'GET',
      types: {
        apiStart: GET_USER_INFO_REQUEST,
        apiSuccess: GET_USER_INFO_SUCCESS,
        apiError: GET_USER_INFO_ERROR,
      },
      onSuccess,
      onFailure,
    },
  };
};

export const getUserSettings = ({
  data,
  onSuccess = NOOP,
  onFailure = NOOP,
}: ReduxActionParameters<{userSettingsId: string}>) => {
  return {
    type: API,
    payload: {
      url: pupa(PROFILE_ENDPOINTS.GET_USER_SETTINGS, data!),
      method: 'GET',
      types: {
        apiStart: GET_USER_SETTINGS_REQUEST,
        apiSuccess: GET_USER_SETTINGS_SUCCESS,
        apiError: GET_USER_SETTINGS_ERROR,
      },
      onSuccess,
      onFailure,
    },
  };
};

export const updateUserInfo = ({data, onSuccess = NOOP, onFailure = NOOP}: ReduxActionParameters<UserProfile>) => {
  return {
    type: API,
    payload: {
      url: PROFILE_ENDPOINTS.UPDATE_USER_INFO,
      method: 'PATCH',
      types: {
        apiStart: UPDATE_USER_INFO_REQUEST,
        apiSuccess: UPDATE_USER_INFO_SUCCESS,
        apiError: UPDATE_USER_INFO_ERROR,
        apiValidationError: UPDATE_USER_INFO_VALIDATION_ERROR,
      },
      data: data,
      onSuccess,
      onFailure,
    },
  };
};

export const uploadUserLogo = ({data, onSuccess = NOOP, onFailure = NOOP}: ReduxActionParameters<UserProfile>) => {
  return {
    type: API,
    payload: {
      url: PROFILE_ENDPOINTS.UPLOAD_USER_LOGO,
      method: 'PATCH',
      types: {
        apiStart: UPLOAD_USER_LOGO_REQUEST,
        apiSuccess: UPLOAD_USER_LOGO_SUCCESS,
        apiError: UPLOAD_USER_LOGO_ERROR,
      },
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onSuccess,
      onFailure,
    },
  };
};

export const deleteUserLogo = ({
  data,
  onSuccess = NOOP,
  onFailure = NOOP,
}: ReduxActionParameters<{userInfoId: string}>) => {
  return {
    type: API,
    payload: {
      url: pupa(PROFILE_ENDPOINTS.DELETE_USER_LOGO, data!),
      method: 'DELETE',
      types: {
        apiStart: DELETE_USER_LOGO_REQUEST,
        apiSuccess: DELETE_USER_LOGO_SUCCESS,
        apiError: DELETE_USER_LOGO_ERROR,
      },
      onSuccess,
      onFailure,
    },
  };
};
