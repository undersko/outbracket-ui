import axios, {AxiosResponse} from 'axios';
import i18next from 'i18next';

import {getLocalStorage, setLocalStorage} from '@helpers/localStorageHelpers';
import {ERROR_CODES} from '@constants/api';

import SHARED_ENDPOINTS from '../endpoints/shared';

let instance: TokenController;

const apiCall = async ({url, requestData}: {url: string; requestData?: Record<string, any>}) => {
  axios.defaults.baseURL = process.env.PUBLIC_URL || '';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common[''];

  try {
    const {data} = await axios.request({
      url,
      method: 'POST',
      data: requestData ? requestData : undefined,
    });
    switch (data.code) {
      case ERROR_CODES.SUCCESS:
        return {code: data.code, result: data.result};
      case ERROR_CODES.ERROR:
        return {code: data.code, result: data.errorMessage};
      case ERROR_CODES.VALIDATION_ERROR:
        return {code: data.code, result: data.validationResult};
      default:
        return {code: ERROR_CODES.ERROR, result: i18next.t('common.unhandledException')};
    }
  } catch (exception: any) {
    return {
      code: ERROR_CODES.ERROR,
      result: exception?.response?.data?.errorMessage || i18next.t('common.unhandledException'),
    };
  }
};

export class TokenController {
  token: string | null;
  tokenExpirationTime: string | null;
  savedPromise: Promise<string | null> | null;
  forceRerender: (() => void) | null;

  constructor(forceRerender: (() => void) | null) {
    const tokensInfo = getLocalStorage('tokensInfo');

    this.token = tokensInfo ? tokensInfo.token : null;
    this.tokenExpirationTime = tokensInfo ? tokensInfo.tokenExpirationTime : null;
    this.savedPromise = null;
    this.forceRerender = forceRerender;
  }

  isTokenValid = (): boolean => {
    if (!this.tokenExpirationTime || !this.token) {
      return false;
    }

    return this.checkExpireDateValid(this.tokenExpirationTime);
  };

  getToken = async (): Promise<string | null> => {
    if (this.token && this.isTokenValid()) {
      return Promise.resolve(this.token);
    }
    if (!this.token || !this.isTokenValid()) {
      if (this.savedPromise) {
        return this.savedPromise;
      } else {
        const promise = this.refreshToken();

        this.savedPromise = promise;

        return promise;
      }
    }

    return Promise.resolve(null);
  };

  checkExpireDateValid = (expiredDateUtc: string): boolean => {
    const now = new Date(new Date().toISOString());
    const expiresDate = new Date(expiredDateUtc);

    return expiresDate > now;
  };

  logIn = async ({email, password}: {email: string; password: string}) => {
    const {code, result} = await apiCall({url: SHARED_ENDPOINTS.account.login, requestData: {email, password}});
    if (code !== ERROR_CODES.SUCCESS) {
      return {isLoggedIn: false, code, result};
    }
    const tokens = {
      token: result.token,
      tokenExpirationTime: result.tokenExpirationTime,
    };
    this.setTokensValue(tokens);
    setLocalStorage('tokensInfo', tokens);
    this.forceRerender && this.forceRerender();
    return {isLoggedIn: true};
  };

  confirmEmail = async (token: string | null) => {
    const {code, result} = await apiCall({url: SHARED_ENDPOINTS.account.confirmEmail, requestData: {token}});
    if (code !== ERROR_CODES.SUCCESS) {
      return {isLoggedIn: false, code, result};
    }
    const tokens = {
      token: result.token,
      tokenExpirationTime: result.tokenExpirationTime,
    };
    this.setTokensValue(tokens);
    setLocalStorage('tokensInfo', tokens);
    return {isLoggedIn: true};
  };

  resetPassword = async ({token, password}: {token: string | null; password: string}) => {
    const {code, result} = await apiCall({url: SHARED_ENDPOINTS.account.resetPassword, requestData: {token, password}});
    if (code !== ERROR_CODES.SUCCESS) {
      return {isLoggedIn: false, code, result};
    }
    const tokens = {
      token: result.token,
      tokenExpirationTime: result.tokenExpirationTime,
    };
    this.setTokensValue(tokens);
    setLocalStorage('tokensInfo', tokens);
    return {isLoggedIn: true};
  };

  signUp = async ({username, email, password}: {username: string; email: string; password: string}) => {
    const {code, result} = await apiCall({
      url: SHARED_ENDPOINTS.account.register,
      requestData: {email, password, username},
    });
    if (code !== ERROR_CODES.SUCCESS) {
      return {code, result};
    }
    return null;
  };

  logOut = async () => {
    const {code, result} = await apiCall({
      url: SHARED_ENDPOINTS.account.revokeToken,
    });
    this.setTokensValue({
      token: null,
      tokenExpirationTime: null,
    });
    setLocalStorage('tokensInfo', null);
    this.forceRerender && this.forceRerender();
    if (code !== ERROR_CODES.SUCCESS) {
      return {code, result};
    }
    return null;
  };

  remindPassword = async ({email}: {email: string}) => {
    const {code, result} = await apiCall({
      url: SHARED_ENDPOINTS.account.remindPassword,
      requestData: {email},
    });
    if (code !== ERROR_CODES.SUCCESS) {
      return {code, result};
    }
    return null;
  };

  setTokensValue = ({token, tokenExpirationTime}: {token: string | null; tokenExpirationTime: string | null}) => {
    setLocalStorage('tokensInfo', {
      token,
      tokenExpirationTime,
    });
    this.token = token;
    this.tokenExpirationTime = tokenExpirationTime;
  };

  isLoggedIn = () => !!getLocalStorage('tokensInfo');

  refreshToken = async () => {
    const {code, result} = await apiCall({
      url: SHARED_ENDPOINTS.account.refreshToken,
    });
    if (code !== ERROR_CODES.SUCCESS) {
      this.setTokensValue({
        token: null,
        tokenExpirationTime: null,
      });
      setLocalStorage('tokensInfo', null);
      this.forceRerender && this.forceRerender();
      return null;
    }
    const tokens = {
      token: result.token,
      tokenExpirationTime: result.tokenExpirationTime,
    };
    this.setTokensValue(tokens);
    setLocalStorage('tokensInfo', tokens);
    return tokens.token;
  };
}

const getInstance = (forceRerender: (() => void) | null) => {
  if (instance) {
    return instance;
  } else {
    instance = new TokenController(forceRerender);
    return instance;
  }
};

export default getInstance;
