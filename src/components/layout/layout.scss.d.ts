declare namespace LayoutScssNamespace {
  export interface ILayoutScss {
    [key: string]: string;
    container: string;
  }
}

declare const LayoutScssModule: LayoutScssNamespace.ILayoutScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LayoutScssNamespace.ILayoutScss;
};

export = LayoutScssModule;
