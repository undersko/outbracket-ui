declare namespace LoginScssNamespace {
  export interface ILoginScss {
    [key: string]: string;
    arrow: string;
    buttonContainer: string;
    infoContainer: string;
    input: string;
    loginContainer: string;
    registrationQuestion: string;
    remindMyPassword: string;
    row: string;
    signInForm: string;
    submitButton: string;
  }
}

declare const LoginScssModule: LoginScssNamespace.ILoginScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LoginScssNamespace.ILoginScss;
};

export = LoginScssModule;
