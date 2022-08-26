import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';

import CenteredContainer from '@shared/CenteredContainer';
import Icon from '@shared/Icon';

import Form from '@uikit/Form';
import Input from '@uikit/Input';
import Button from '@uikit/Button';

import {useToasts} from '@shared/Toasts';

import getTokenInstance, {TokenController} from '@controllers/TokenController';

import {EMAIL} from '@constants/regexp';
import {ERROR_CODES} from '@constants/api';

import {getManualValidationErrors} from '@helpers/formHelpers';

import useCustomController from '@hooks/useCustomController';

import styles from './remindPassword.scss';

interface FieldValues {
  email: string;
}

const RemindPassword: FC = () => {
  const {t} = useTranslation();
  const formMethods = useForm();
  const {addToast} = useToasts();
  const tokenController = useCustomController<TokenController>(getTokenInstance);

  const handleSubmit = async (data: FieldValues) => {
    const remindPasswordResult = await tokenController.remindPassword(data);
    if (remindPasswordResult) {
      if (remindPasswordResult.code === ERROR_CODES.VALIDATION_ERROR) {
        const validationErrors = getManualValidationErrors<FieldValues>(remindPasswordResult.result, {
          UserDoesntExist: 'email',
        });
        validationErrors && validationErrors.forEach((validationError) => formMethods.setError(...validationError));
      } else {
        addToast(<div>{remindPasswordResult.result}</div>, {appearance: 'error'}, t('common.error'));
      }
    } else {
      addToast(
        <div>{t('login.remindPasswordSuccessMessage', {email: data.email})}</div>,
        {appearance: 'success'},
        t('common.success'),
      );
    }
  };

  return (
    <CenteredContainer>
      <div className={styles.remindPasswordContainer}>
        <div className={styles.row}>
          <div className={styles.infoContainer}>
            <h2>{t('login.changeYourPassword')}</h2>
          </div>
          <Form className={styles.remindPasswordForm} onSubmit={handleSubmit} formMethods={formMethods}>
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
            <div className={styles.buttonContainer}>
              <Button className={styles.submitButton}>
                <span>{t('login.send')}</span>
                <Icon glyph="arrow-right" className={styles.arrow} />
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </CenteredContainer>
  );
};

export default RemindPassword;
