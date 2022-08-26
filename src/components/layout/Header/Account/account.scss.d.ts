declare namespace AccountScssNamespace {
  export interface IAccountScss {
    [key: string]: string;
    accountContainer: string;
    logo: string;
    user: string;
  }
}

declare const AccountScssModule: AccountScssNamespace.IAccountScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AccountScssNamespace.IAccountScss;
};

export = AccountScssModule;
