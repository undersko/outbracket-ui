declare namespace UserPhotoScssNamespace {
  export interface IUserPhotoScss {
    [key: string]: string;
    container: string;
    uploadButton: string;
    submitButton: string;
    upload: string;
    arrow: string;
    delete: string;
    deleteContainer: string;
  }
}

declare const UserPhotoScssModule: UserPhotoScssNamespace.IUserPhotoScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: UserPhotoScssNamespace.IUserPhotoScss;
};

export = UserPhotoScssModule;
