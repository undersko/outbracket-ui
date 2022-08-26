declare namespace ButtonScssNamespace {
  export interface IButtonScss {
    button: string;
  }
}

declare const ButtonScssModule: ButtonScssNamespace.IButtonScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ButtonScssNamespace.IButtonScss;
};

export = ButtonScssModule;
