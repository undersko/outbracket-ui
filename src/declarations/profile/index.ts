import {DictionaryItem, Nullable} from '@declarations/shared';
import {Crop} from 'react-image-crop';

export interface UserInfoModel {
  bio: Nullable<string>;
  country: Nullable<DictionaryItem>;
}

export interface UserProfile extends UserInfoModel {
  id: string;
  email: Nullable<string>;
  username: Nullable<string>;
  imageId: Nullable<string>;
  userSettingsId: Nullable<string>;
  settings: {crop: Nullable<Crop>};
}
