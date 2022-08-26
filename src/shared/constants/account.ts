import i18next from 'i18next';

export const UNAUTHORIZED_USER_OPTION_IDS = {
  LOGIN: 1,
};

export const UNAUTHORIZED_USER_OPTIONS = [{id: UNAUTHORIZED_USER_OPTION_IDS.LOGIN, element: i18next.t('login.signIn')}];

export const AUTHORIZED_USER_OPTION_IDS = {
  PROFILE: 1,
  TOURNAMENTS: 2,
  LOGOUT: 3,
};

export const AUTHORIZED_USER_OPTIONS = [
  {id: AUTHORIZED_USER_OPTION_IDS.PROFILE, element: i18next.t('login.profile')},
  {id: AUTHORIZED_USER_OPTION_IDS.TOURNAMENTS, element: i18next.t('tournaments.title')},
  {id: AUTHORIZED_USER_OPTION_IDS.LOGOUT, element: i18next.t('login.signOut')},
];
