declare namespace ReadonlyFormScssNamespace {
  export interface IReadonlyFormScss {
    [key: string]: string;
    container: string;
    editIcon: string;
    form: string;
    infoBlock: string;
    title: string;
    info: string;
  }
}

declare const ReadonlyFormScssModule: ReadonlyFormScssNamespace.IReadonlyFormScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ReadonlyFormScssNamespace.IReadonlyFormScss;
};

export = ReadonlyFormScssModule;
