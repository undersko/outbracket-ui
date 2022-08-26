import React, {MouseEvent, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import pupa from 'pupa';

import Icon from '@shared/Icon';

import getTokenInstance, {TokenController} from '@controllers/TokenController';
import useCustomController from '@hooks/useCustomController';

import ActionDropDown from '@uikit/ActionDropDown';

import {PAGES} from '@constants/pages';
import {
  UNAUTHORIZED_USER_OPTION_IDS,
  AUTHORIZED_USER_OPTION_IDS,
  UNAUTHORIZED_USER_OPTIONS,
  AUTHORIZED_USER_OPTIONS,
} from '@constants/account';

import styles from './account.scss';
import {useQuery} from '@store';
import {getUserInfo} from '@redux-actions/profile';
import HideComponent from '@shared/HideComponent';
import {IMAGE_CONTAINERS} from '@constants/image-containers';

import IMAGE_ENDPOINTS from '../../../../endpoints/image';

const Account = () => {
  const {query: queryUserInfo, data: profile} = useQuery(
    getUserInfo,
    'get',
    (state) => state.profileReducer.userProfile,
  );

  let navigate = useNavigate();
  const tokenController = useCustomController<TokenController>(getTokenInstance);
  const isLoggedIn = tokenController.isLoggedIn();

  useEffect(() => {
    if (isLoggedIn) {
      queryUserInfo();
    }
  }, [isLoggedIn]);

  const handleClick = useCallback(
    async (e: MouseEvent<HTMLLIElement>, actionId: number) => {
      if (!isLoggedIn) {
        switch (actionId) {
          case UNAUTHORIZED_USER_OPTION_IDS.LOGIN:
            navigate(PAGES.LOGIN);
            break;

          default:
            break;
        }
      } else {
        switch (actionId) {
          case AUTHORIZED_USER_OPTION_IDS.LOGOUT:
            await tokenController.logOut();
            navigate(PAGES.HOME);
            break;
          case AUTHORIZED_USER_OPTION_IDS.PROFILE:
            navigate(PAGES.PROFILE);
            break;
          case AUTHORIZED_USER_OPTION_IDS.TOURNAMENTS:
            navigate(PAGES.TOURNAMENTS);
            break;

          default:
            break;
        }
      }
    },
    [isLoggedIn],
  );

  const dropDownOptions = tokenController.isLoggedIn() ? AUTHORIZED_USER_OPTIONS : UNAUTHORIZED_USER_OPTIONS;

  return (
    <ActionDropDown className={styles.accountContainer} options={dropDownOptions} onAction={handleClick}>
      <HideComponent isHide={isLoggedIn}>
        <Icon className={styles.logo} glyph="account" />
      </HideComponent>
      <HideComponent isHide={!isLoggedIn}>
        <div className={styles.user}>
          <span>{profile.username}</span>
          {profile.imageId ? (
            <img
              className={styles.logo}
              src={`${pupa(IMAGE_ENDPOINTS.GET_SCALED_IMAGE, {
                container: IMAGE_CONTAINERS.LOGO,
                name: profile.imageId,
              })}`}
            />
          ) : (
            <Icon className={styles.logo} glyph="account" />
          )}
        </div>
      </HideComponent>
    </ActionDropDown>
  );
};

export default Account;
