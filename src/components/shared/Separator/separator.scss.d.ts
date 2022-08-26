declare namespace SeparatorScssNamespace {
  export interface ISeparatorScss {
    separator: string;
  }
}

declare const SeparatorScssModule: SeparatorScssNamespace.ISeparatorScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SeparatorScssNamespace.ISeparatorScss;
};

export = SeparatorScssModule;
