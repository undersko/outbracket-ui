declare namespace ActionDropDownScssNamespace {
  export interface IActionDropDownScss {
    container: string;
    optionsContainer: string;
    option: string;
    unmounted: string;
    entering: string;
    entered: string;
    exiting: string;
    exited: string;
  }
}

declare const ActionDropDownScssModule: ActionDropDownScssNamespace.IActionDropDownScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ActionDropDownScssNamespace.IActionDropDownScss;
};

export = ActionDropDownScssModule;
