import React, {FC, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {useToasts} from '@shared/Toasts';

import getTokenInstance, {TokenController} from '@controllers/TokenController';

import {PAGES} from '@constants/pages';

import useCustomController from '@hooks/useCustomController';

const ConfirmEmail: FC = () => {
  const {t} = useTranslation();
  let location = useLocation();
  let navigate = useNavigate();
  const {addToast} = useToasts();
  const tokenController = useCustomController<TokenController>(getTokenInstance);

  useEffect(() => {
    const confirmEmail = async () => {
      const token = new URLSearchParams(location.search).get('token');
      if (!token) {
        navigate(PAGES.HOME, {replace: true});
      }
      const confirmResult = await tokenController.confirmEmail(token);
      if (confirmResult && !confirmResult.isLoggedIn) {
        addToast(<div>{confirmResult.result}</div>, {appearance: 'error'}, t('common.error'));
      }
      navigate(PAGES.HOME, {replace: true});
    };

    confirmEmail();
  }, []);

  return <div></div>;
};

export default ConfirmEmail;
