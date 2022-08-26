declare namespace InputScssNamespace {
  export interface IInputScss {
    [key: string]: string;
    default: string;
    formControl: string;
    inputContainer: string;
    ribbon: string;
    label: string;
  }
}

declare const InputScssModule: InputScssNamespace.IInputScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: InputScssNamespace.IInputScss;
};

export = InputScssModule;
