import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';

import Form from '@uikit/Form';
import Input from '@uikit/Input';
import Button from '@uikit/Button';

import CenteredContainer from '@shared/CenteredContainer';
import Icon from '@shared/Icon';
import Link from '@shared/Link';
import {useToasts} from '@shared/Toasts';

import getTokenInstance, {TokenController} from '@controllers/TokenController';

import {PAGES} from '@constants/pages';
import {ERROR_CODES} from '@constants/api';
import {EMAIL} from '@constants/regexp';

import {getManualValidationErrors} from '@helpers/formHelpers';

import useCustomController from '@hooks/useCustomController';

import styles from './registration.scss';

interface FieldValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Registration: FC = () => {
  const {t} = useTranslation();
  let navigate = useNavigate();
  const formMethods = useForm();
  const {addToast} = useToasts();
  const tokenController = useCustomController<TokenController>(getTokenInstance);

  const handleSubmit = async (data: FieldValues) => {
    const signUpResult = await tokenController.signUp(data);
    if (signUpResult) {
      if (signUpResult.code === ERROR_CODES.VALIDATION_ERROR) {
        const validationErrors = getManualValidationErrors<FieldValues>(signUpResult.result, {
          UserEmailExist: 'email',
          UsernameExist: 'username',
        });
        validationErrors && validationErrors.forEach((validationError) => formMethods.setError(...validationError));
      } else {
        addToast(<div>{signUpResult.result}</div>, {appearance: 'error'}, t('common.error'));
      }
    } else {
      addToast(
        <div>{t('login.registrationSuccessMessage', {email: data.email})}</div>,
        {appearance: 'success'},
        t('common.congratulations'),
      );
    }
  };

  return (
    <CenteredContainer>
      <div className={styles.registrationContainer}>
        <h2>{t('login.signUp')}</h2>
        <div className={styles.row}>
          <div className={styles.infoContainer}>
            <span className={styles.loginQuestion}>{t('login.haveAnAccount')}</span>
            <Link text={t('login.signIn')} onClick={() => navigate(PAGES.LOGIN)} />
          </div>
          <Form className={styles.signUpForm} onSubmit={handleSubmit} formMethods={formMethods}>
            <Input
              name="username"
              className={styles.input}
              placeholder={t('login.username')}
              validation={{
                required: t('login.emptyEmail') as string,
              }}
            />
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
                validate: (value: string) =>
                  value === formMethods.getValues().password || (t('login.passwordAreDifferent') as string),
              }}
            />
            <div className={styles.buttonContainer}>
              <Button className={styles.submitButton}>
                <span>{t('login.signUp')}</span>
                <Icon glyph="arrow-right" className={styles.arrow} />
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </CenteredContainer>
  );
};

Registration.propTypes = {};

export default Registration;
