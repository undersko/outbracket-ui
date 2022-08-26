declare namespace CenteredContainerScssNamespace {
  export interface ICenteredContainerScss {
    container: string;
  }
}

declare const CenteredContainerScssModule: CenteredContainerScssNamespace.ICenteredContainerScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CenteredContainerScssNamespace.ICenteredContainerScss;
};

export = CenteredContainerScssModule;
