declare namespace IconScssNamespace {
  export interface IIconScss {
    svg: string;
  }
}

declare const IconScssModule: IconScssNamespace.IIconScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IconScssNamespace.IIconScss;
};

export = IconScssModule;
