import React, {FC} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';

import {useToasts} from '@shared/Toasts';
import Icon from '@shared/Icon';
import CenteredContainer from '@shared/CenteredContainer';

import Form from '@uikit/Form';
import Input from '@uikit/Input';
import Button from '@uikit/Button';

import getTokenInstance, {TokenController} from '@controllers/TokenController';

import {PAGES} from '@constants/pages';

import useCustomController from '@hooks/useCustomController';

import styles from './resetPassword.scss';

interface FieldValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword: FC = () => {
  const {t} = useTranslation();
  let location = useLocation();
  let navigate = useNavigate();
  const formMethods = useForm();
  const {addToast} = useToasts();
  const tokenController = useCustomController<TokenController>(getTokenInstance);

  const handleSubmit = async (data: FieldValues) => {
    if (tokenController.isLoggedIn()) {
      navigate(PAGES.HOME, {replace: true});
      return;
    }
    const token = new URLSearchParams(location.search).get('token');
    const resetPasswordResult = await tokenController.resetPassword({token, ...data});

    if (resetPasswordResult && !resetPasswordResult.isLoggedIn) {
      addToast(<div>{resetPasswordResult.result}</div>, {appearance: 'error'}, t('common.error'));
    } else {
      navigate(PAGES.HOME, {replace: true});
    }
  };

  return (
    <CenteredContainer>
      <div className={styles.resetPasswordContainer}>
        <h2>{t('login.resetPassword')}</h2>
        <div className={styles.row}>
          <Form className={styles.resetPasswordForm} onSubmit={handleSubmit} formMethods={formMethods}>
            <Input
              name="password"
              type="password"
              className={styles.input}
              placeholder={t('login.password')}
              validation={{
                required: t('login.emptyPassword') as string,
                minLength: {
                  value: 6,
                  message: t('login.passwordMinLengthValidationError', {number: '6'}),
                },
              }}
            />
            <Input
              name="confirmPassword"
              type="password"
              className={styles.input}
              placeholder={t('login.passwordConfirmation')}
              validation={{
                required: t('login.emptyPassword') as string,
                minLength: {
                  value: 6,
                  message: t('login.passwordMinLengthValidationError', {number: '6'}),
                },
                validate: (value) =>
                  value === formMethods.getValues().password || (t('login.passwordAreDifferent') as string),
              }}
            />
            <div className={styles.buttonContainer}>
              <Button className={styles.submitButton}>
                <span>{t('common.reset')}</span>
                <Icon glyph="arrow-right" className={styles.arrow} />
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </CenteredContainer>
  );
};

export default ResetPassword;
