declare namespace HeaderScssNamespace {
  export interface IHeaderScss {
    [key: string]: string;
    authColumn: string;
    container: string;
    desktopOnlyContainer: string;
    innerBlockContainer: string;
    logoColumn: string;
    HeaderColumn: string;
    separatedBlock: string;
    separator: string;
  }
}

declare const HeaderScssModule: HeaderScssNamespace.IHeaderScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HeaderScssNamespace.IHeaderScss;
};

export = HeaderScssModule;
