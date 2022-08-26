import React, {FC, useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {updateUserInfo, uploadUserLogo, deleteUserLogo, getUserInfo, getUserSettings} from '@redux-actions/profile';
import {RootState, useQuery} from '@store';
import CenteredContainer from '@shared/CenteredContainer';
import {UserPhoto, UserPhotoModel} from './UserPhoto';
import {UserInfo} from './UserInfo';
import styles from './profile.scss';
import {UserInfoModel} from '@declarations/profile';
import {getCountries} from '@redux-actions/shared/dictionaries';

const Profile: FC = () => {
  const {data: profile} = useSelector((state: RootState) => state.profileReducer.userProfile);
  const {query: queryUserInfo} = useQuery(getUserSettings, 'get', (state) => state.profileReducer.userProfile);
  const {query: queryCountries, data: countries} = useQuery(
    getCountries,
    'get',
    (state) => state.dictionariesReducer.countries,
  );
  const {query: queryUpdateUserInfo, state: profileState} = useQuery(
    updateUserInfo,
    'patch',
    (state) => state.profileReducer.userProfile,
  );
  const {query: queryUploadUserLogo} = useQuery(uploadUserLogo, 'patch', (state) => state.profileReducer.userProfile);
  const {query: queryDeleteUserLogo} = useQuery(deleteUserLogo, 'delete', (state) => state.profileReducer.userProfile);

  useEffect(() => {
    queryCountries();
    if (profile.userSettingsId) {
      queryUserInfo({data: {userSettingsId: profile.userSettingsId}});
    }
  }, [profile.userSettingsId]);

  const handleSubmit = useCallback(
    (data: UserInfoModel, onSuccess: () => void) => {
      queryUpdateUserInfo({data: {...profile, ...data}, onSuccess});
    },
    [profile],
  );

  const handlePhotoSubmit = useCallback(
    (data: UserPhotoModel, onSuccess?: () => void) => {
      queryUploadUserLogo({
        data: {...profile, ...data},
        onSuccess: () => {
          queryUserInfo({data: {userSettingsId: profile.userSettingsId!}});
          onSuccess?.();
        },
      });
    },
    [profile],
  );

  const handleDelete = useCallback(() => {
    queryDeleteUserLogo({
      data: {userInfoId: profile.id},
      onSuccess: () => queryUserInfo({data: {userSettingsId: profile.userSettingsId!}}),
    });
  }, [profile]);

  return (
    <CenteredContainer>
      <div className={styles.container}>
        <UserPhoto
          userPhotoId={profile.imageId}
          onSubmit={handlePhotoSubmit}
          handleDelete={handleDelete}
          crop={profile.settings?.crop}
        />
        <UserInfo userInfo={profile} profileState={profileState} handleSubmit={handleSubmit} countries={countries} />
      </div>
    </CenteredContainer>
  );
};

export default Profile;
