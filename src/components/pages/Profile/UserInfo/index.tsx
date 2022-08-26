import React, {FC, useCallback, useState} from 'react';
import {UserProfile} from '@declarations/profile';
import styles from './userInfo.scss';
import {useTranslation} from 'react-i18next';
import Icon from '@shared/Icon';
import {FormEditor} from './FormEditor';
import {DictionaryItem, EntityReducerActionState} from '@declarations/shared';
import {UserInfoModel} from '@declarations/profile';
import {ReadonlyForm} from './ReadonlyForm';

type UserInfoProps = {
  userInfo: UserProfile;
  handleSubmit: (data: UserInfoModel, onSuccess: () => void) => void;
  countries: DictionaryItem[];
  profileState?: EntityReducerActionState;
};

export const UserInfo: FC<UserInfoProps> = ({userInfo, profileState, handleSubmit, countries}) => {
  const {t} = useTranslation();
  const [isEditMode, setIsEditMode] = useState(false);

  const onSubmit = useCallback(
    (data: UserInfoModel) => {
      handleSubmit(data, () => setIsEditMode(!isEditMode));
    },
    [isEditMode],
  );

  return (
    <div className={styles.container}>
      <h1>
        {t('profile.hello')}, {userInfo.username}
      </h1>
      <div>
        {!isEditMode && <ReadonlyForm userInfo={userInfo} setIsEditMode={setIsEditMode} />}
        {isEditMode && (
          <FormEditor userInfo={userInfo} profileState={profileState} handleSubmit={onSubmit} countries={countries} />
        )}
      </div>
    </div>
  );
};
