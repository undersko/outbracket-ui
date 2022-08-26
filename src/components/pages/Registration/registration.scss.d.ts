declare namespace RegistrationScssNamespace {
  export interface IRegistrationScss {
    [key: string]: string;
    arrow: string;
    buttonContainer: string;
    infoContainer: string;
    input: string;
    loginQuestion: string;
    registrationContainer: string;
    row: string;
    signUpForm: string;
    submitButton: string;
  }
}

declare const RegistrationScssModule: RegistrationScssNamespace.IRegistrationScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: RegistrationScssNamespace.IRegistrationScss;
};

export = RegistrationScssModule;
