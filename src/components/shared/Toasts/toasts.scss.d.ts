declare namespace ToastsScssNamespace {
  export interface IToastsScss {
    container: string;
  }
}

declare const ToastsScssModule: ToastsScssNamespace.IToastsScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ToastsScssNamespace.IToastsScss;
};

export = ToastsScssModule;
