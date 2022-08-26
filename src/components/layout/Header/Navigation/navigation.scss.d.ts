declare namespace NavigationScssNamespace {
  export interface INavigationScss {
    [key: string]: string;
    column: string;
    link: string;
    linkA: string;
    linkIcon: string;
    list: string;
    nav: string;
    row: string;
  }
}

declare const NavigationScssModule: NavigationScssNamespace.INavigationScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NavigationScssNamespace.INavigationScss;
};

export = NavigationScssModule;
