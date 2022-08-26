declare namespace ResetPasswordScssNamespace {
  export interface IResetPasswordScss {
    [key: string]: string;
    arrow: string;
    buttonContainer: string;
    input: string;
    resetPasswordContainer: string;
    resetPasswordForm: string;
    row: string;
    submitButton: string;
  }
}

declare const ResetPasswordScssModule: ResetPasswordScssNamespace.IResetPasswordScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ResetPasswordScssNamespace.IResetPasswordScss;
};

export = ResetPasswordScssModule;
