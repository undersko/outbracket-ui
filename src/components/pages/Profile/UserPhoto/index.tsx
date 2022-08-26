import React, {ChangeEventHandler, FC, ReactEventHandler, SyntheticEvent, useCallback, useMemo, useState} from 'react';
import {Nullable} from '@declarations/shared';
import ReactCrop, {Crop, makeAspectCrop, centerCrop, PixelCrop} from 'react-image-crop';
import styles from './userPhoto.scss';
import 'react-image-crop/dist/ReactCrop.css';
import {useTranslation} from 'react-i18next';
import Icon from '@shared/Icon';
import Button from '@uikit/Button';
import HideComponent from '@shared/HideComponent';
import Form from '@uikit/Form';
import {useForm} from 'react-hook-form';
import pupa from 'pupa';
import IMAGE_ENDPOINTS from '../../../../endpoints/image';
import {IMAGE_CONTAINERS} from '@constants/image-containers';

export type UserCrop = {
  imageHeight: number;
  imageWidth: number;
};

export type UserPhotoModel = {
  image: Nullable<File>;
  crop?: Partial<Crop> & UserCrop;
};

type UserPhotoProps = {
  userPhotoId: Nullable<string>;
  crop: Nullable<Crop>;
  onSubmit: (data: UserPhotoModel, onSuccess?: () => void) => void;
  handleDelete: () => void;
};

type FieldValues = {
  image: FileList;
};

export const UserPhoto: FC<UserPhotoProps> = ({userPhotoId, crop, onSubmit, handleDelete}) => {
  const [upImg, setUpImg] = useState<Nullable<string>>();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [thisCrop, setCrop] = useState<Nullable<Crop>>(null);
  const [userCrop, setUserCrop] = useState<UserCrop>();
  const {t} = useTranslation();

  const formMethods = useForm<FieldValues>();

  const onSelectFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUpImg(e?.target?.result?.toString());
        setIsImageLoaded(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onDelete: ReactEventHandler<HTMLDivElement> = useCallback(() => {
    setUpImg('');
    if (userPhotoId) {
      handleDelete();
    }
    setIsImageLoaded(false);
    setCrop(null);
  }, [userPhotoId]);

  const handleSubmit: (data: FieldValues) => void = useCallback(
    (data) => {
      if (!userCrop) {
        return;
      }
      onSubmit(
        {
          image: data?.image?.item(0),
          crop: {...thisCrop, imageHeight: userCrop.imageHeight, imageWidth: userCrop.imageWidth},
        },
        () => setIsImageLoaded(false),
      );
    },
    [userCrop, thisCrop],
  );

  const onImageLoad: (e: SyntheticEvent<HTMLImageElement>) => void = (e) => {
    const {naturalWidth, naturalHeight, width, height} = e.currentTarget;

    const newCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1,
        naturalWidth,
        naturalHeight,
      ),
      naturalWidth,
      naturalHeight,
    );

    setUserCrop({imageWidth: width, imageHeight: height});
    setCrop(crop || newCrop);
  };

  const onComplete: (crop: PixelCrop) => void = (crop) => {
    const newCrop = (Object.keys(crop) as Array<keyof PixelCrop>).reduce((acc, key) => {
      if (typeof crop[key] !== 'string') {
        return {...acc, [key]: Math.round(crop[key] as number)};
      }
      return {...acc, [key]: crop[key]};
    }, {} as Crop);

    setCrop(newCrop);
  };

  const isCropChanged = useMemo(() => {
    return (
      thisCrop?.height !== crop?.height ||
      thisCrop?.width !== crop?.width ||
      thisCrop?.x !== crop?.x ||
      thisCrop?.y !== crop?.y
    );
  }, [thisCrop, crop]);

  const imageInput = formMethods.register('image');

  return (
    <div className={styles.container}>
      {(upImg || userPhotoId) && (
        <ReactCrop
          className={styles.crop}
          crop={thisCrop || undefined}
          onChange={(c) => setCrop(c)}
          circularCrop
          aspect={1}
          minWidth={100}
          keepSelection
          onComplete={onComplete}
        >
          <img
            src={
              upImg || `${pupa(IMAGE_ENDPOINTS.GET_FULL_IMAGE, {container: IMAGE_CONTAINERS.LOGO, name: userPhotoId})}`
            }
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      <HideComponent isHide={!upImg && !userPhotoId}>
        <div className={styles.deleteContainer} onClick={onDelete}>
          <Icon glyph="delete" className={styles.delete} />
        </div>
      </HideComponent>
      <div>
        <Form onSubmit={handleSubmit} formMethods={formMethods}>
          <HideComponent isHide={isImageLoaded || !!userPhotoId}>
            <Button type="button" className={styles.uploadButton}>
              <label htmlFor="file-uploader">
                <span>{t('profile.selectFile')}</span>
                <Icon glyph="upload" className={styles.upload} />
              </label>
              <input
                id="file-uploader"
                type="file"
                accept="image/*"
                {...imageInput}
                onChange={(e) => {
                  onSelectFile(e);
                  imageInput.onChange(e);
                }}
              />
            </Button>
          </HideComponent>
          <HideComponent isHide={!isImageLoaded && !isCropChanged}>
            <Button className={styles.submitButton}>
              <span>{t('common.save')}</span>
              <Icon glyph="arrow-right" className={styles.arrow} />
            </Button>
          </HideComponent>
        </Form>
      </div>
    </div>
  );
};