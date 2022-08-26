import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';

import Form from '@uikit/Form';
import Input from '@uikit/Input';
import Button from '@uikit/Button';

import Link from '@shared/Link';
import Icon from '@shared/Icon';
import CenteredContainer from '@shared/CenteredContainer';
import {useToasts} from '@shared/Toasts';

import getTokenInstance, {TokenController} from '@controllers/TokenController';

import {EMAIL} from '@constants/regexp';
import {ERROR_CODES} from '@constants/api';
import {PAGES} from '@constants/pages';

import useCustomController from '@hooks/useCustomController';

import {getManualValidationErrors} from '@helpers/formHelpers';

import styles from './login.scss';

interface FieldValues {
  email: string;
  password: string;
}

const Login: FC = () => {
  const {t} = useTranslation();
  let navigate = useNavigate();
  const formMethods = useForm<FieldValues>();
  const {addToast} = useToasts();
  const tokenController = useCustomController<TokenController>(getTokenInstance);

  const handleSubmit = async (data: FieldValues) => {
    if (tokenController.isLoggedIn()) {
      navigate(PAGES.HOME);
      return;
    }
    const logInResult = await tokenController.logIn(data);
    if (logInResult && !logInResult.isLoggedIn) {
      if (logInResult.code === ERROR_CODES.VALIDATION_ERROR) {
        const validationErrors = getManualValidationErrors<FieldValues>(logInResult.result, {
          UsernameOrEmailIsInvalid: 'email',
          EmailIsNotConfirmed: 'email',
        });
        validationErrors && validationErrors.forEach((validationError) => formMethods.setError(...validationError));
      } else {
        addToast(<div>{logInResult.result}</div>, {appearance: 'error'}, t('common.error'));
      }
    } else {
      navigate(PAGES.HOME);
    }
  };

  return (
    <CenteredContainer>
      <div className={styles.loginContainer}>
        <h2>{t('login.iAlreadyHaveAnAccount')}</h2>
        <div className={styles.row}>
          <div className={styles.infoContainer}>
            <span className={styles.registrationQuestion}>{t('login.dontHaveAnAccount')}</span>
            <Link text={t('login.registration')} onClick={() => navigate(PAGES.REGISTRATION)} />
          </div>
          <Form className={styles.signInForm} onSubmit={handleSubmit} formMethods={formMethods}>
            <Input
              name="email"
              className={styles.input}
              placeholder={t('login.email')}
              validation={{
                pattern: {
                  value: EMAIL,
                  message: t('login.invalidEmail'),
                },
                required: t('login.emptyEmail') as string,
              }}
            />
            <Input
              name="password"
              type="password"
              className={styles.input}
              placeholder={t('login.password')}
              validation={{
                required: t('login.emptyPassword') as string,
                minLength: {
                  value: 6,
                  message: t('login.passwordMinLengthValidationError', {
                    number: '6',
                  }),
                },
              }}
            />
            <Link
              className={styles.remindMyPassword}
              text={t('login.remindMyPassword')}
              onClick={() => navigate(PAGES.REMIND_PASSWORD)}
            />
            <div className={styles.buttonContainer}>
              <Button className={styles.submitButton}>
                <span>{t('login.signIn')}</span>
                <Icon glyph="arrow-right" className={styles.arrow} />
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </CenteredContainer>
  );
};

export default Login;
