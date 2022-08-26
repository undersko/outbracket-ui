declare namespace UserInfoScssNamespace {
  export interface IUserInfoScss {
    [key: string]: string;
    container: string;
    info: string;
    editIcon: string;
  }
}

declare const UserInfoScssModule: UserInfoScssNamespace.IUserInfoScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: UserInfoScssNamespace.IUserInfoScss;
};

export = UserInfoScssModule;
