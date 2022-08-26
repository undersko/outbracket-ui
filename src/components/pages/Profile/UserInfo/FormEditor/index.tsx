import * as React from 'react';
import {FC, useCallback, useEffect} from 'react';
import {DictionaryItem, EntityReducerActionState, Nullable, SelectValue} from '@declarations/shared';
import styles from './formEditor.scss';
import Textarea from '@uikit/Textarea';
import Button from '@uikit/Button';
import Icon from '@shared/Icon';
import Form from '@uikit/Form';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import Select from '@uikit/Select';
import {
  formatDictionaryItem,
  formatSelectOption,
  formatSelectOptions,
  getManualValidationErrors,
} from '@helpers/formHelpers';
import {UserInfoModel} from '@declarations/profile';

type FormEditorProps = {
  userInfo: UserInfoModel;
  profileState?: EntityReducerActionState;
  handleSubmit: (data: UserInfoModel) => void;
  countries: DictionaryItem[];
};

type FieldValues = {
  bio: Nullable<string>;
  country: Nullable<SelectValue>;
};

export const FormEditor: FC<FormEditorProps> = ({userInfo, profileState, handleSubmit, countries}) => {
  const {t} = useTranslation();
  const formMethods = useForm<FieldValues>({
    defaultValues: {
      ...userInfo,
      country: formatSelectOption(userInfo?.country),
    },
  });

  useEffect(() => {
    formMethods.reset({
      ...userInfo,
      country: formatSelectOption(userInfo?.country),
    });
  }, [userInfo.bio, userInfo.country?.id]);

  useEffect(() => {
    if (!profileState?.validationErrors) {
      return;
    }
    const validationErrors = getManualValidationErrors<FieldValues>(profileState?.validationErrors, {
      MaximumLength: 'bio',
    });
    validationErrors && validationErrors.forEach((validationError) => formMethods.setError(...validationError));
  }, [profileState]);

  const onSubmit = useCallback((data: FieldValues) => {
    handleSubmit({...data, country: formatDictionaryItem(data?.country)});
  }, []);
  return (
    <Form className={styles.form} onSubmit={onSubmit} formMethods={formMethods}>
      <Textarea name="bio" label={t('profile.about')} className={styles.input} maxLength={50} />
      <Select
        name="country"
        label={t('profile.country')}
        options={formatSelectOptions(countries)}
        className={styles.input}
        defaultValue={formatSelectOption(userInfo?.country)}
      />
      <div className={styles.buttonContainer}>
        <Button className={styles.submitButton}>
          <span>{t('common.save')}</span>
          <Icon glyph="arrow-right" className={styles.arrow} />
        </Button>
      </div>
    </Form>
  );
};
