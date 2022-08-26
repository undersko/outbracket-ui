import React, {FC} from 'react';
import styles from './readonlyForm.scss';
import Icon from '@shared/Icon';
import {UserInfoModel} from '@declarations/profile';
import {useTranslation} from 'react-i18next';

type ReadonlyFormProps = {
  userInfo: UserInfoModel;
  setIsEditMode: (isEditMode: boolean) => void;
};

export const ReadonlyForm: FC<ReadonlyFormProps> = ({userInfo, setIsEditMode}) => {
  const {t} = useTranslation();

  return (
    <div className={styles.container}>
      <Icon className={styles.editIcon} glyph="edit" onClick={() => setIsEditMode(true)} />
      <div className={styles.form}>
        <div className={styles.infoBlock}>
          <span className={styles.title}>{t('profile.about')}</span>
          <span className={styles.info}>{userInfo.bio}</span>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.title}>{t('profile.country')}</span>
          <span className={styles.info}>{userInfo.country?.name}</span>
        </div>
      </div>
    </div>
  );
};
