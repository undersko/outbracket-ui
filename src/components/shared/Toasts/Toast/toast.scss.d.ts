declare namespace ToastScssNamespace {
  export interface IToastScss {
    toast: string;
    iconContainer: string;
    bodyContainer: string;
    buttonContainer: string;
    error: string;
    info: string;
    success: string;
    warning: string;
    entering: string;
    entered: string;
    exiting: string;
    exited: string;
    title: string;
  }
}

declare const ToastScssModule: ToastScssNamespace.IToastScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ToastScssNamespace.IToastScss;
};

export = ToastScssModule;
