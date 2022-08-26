declare namespace RemindPasswordScssNamespace {
  export interface IRemindPasswordScss {
    [key: string]: string;
    arrow: string;
    buttonContainer: string;
    infoContainer: string;
    input: string;
    remindMyPassword: string;
    remindPasswordContainer: string;
    remindPasswordForm: string;
    row: string;
    submitButton: string;
  }
}

declare const RemindPasswordScssModule: RemindPasswordScssNamespace.IRemindPasswordScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: RemindPasswordScssNamespace.IRemindPasswordScss;
};

export = RemindPasswordScssModule;
