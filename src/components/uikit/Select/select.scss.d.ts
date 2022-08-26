declare namespace SelectScssNamespace {
  export interface ISelectScss {
    [key: string]: string;
    selectContainer: string;
    label: string;
  }
}

declare const SelectScssModule: SelectScssNamespace.ISelectScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SelectScssNamespace.ISelectScss;
};

export = SelectScssModule;
