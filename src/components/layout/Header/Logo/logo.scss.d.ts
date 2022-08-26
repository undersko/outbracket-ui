declare namespace LogoScssNamespace {
  export interface ILogoScss {
    [key: string]: string;
    logo: string;
    logoContainer: string;
  }
}

declare const LogoScssModule: LogoScssNamespace.ILogoScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LogoScssNamespace.ILogoScss;
};

export = LogoScssModule;
