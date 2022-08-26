declare namespace GroupedOptionsScssNamespace {
  export interface IGroupedOptionsScss {
    [key: string]: string;
    column: string;
    container: string;
    gradient: string;
    groupedContainer: string;
    groupedLink: string;
    groupedLinks: string;
    groupedOptions: string;
    link: string;
    linkA: string;
    linkIcon: string;
    list: string;
    nav: string;
    row: string;
    slideEnter: string;
    slideEnterActive: string;
    slideEnterDone: string;
    slideExitDone: string;
  }
}

declare const GroupedOptionsScssModule: GroupedOptionsScssNamespace.IGroupedOptionsScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GroupedOptionsScssNamespace.IGroupedOptionsScss;
};

export = GroupedOptionsScssModule;
