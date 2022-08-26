declare namespace FormEditorScssNamespace {
  export interface IFormEditorScss {
    [key: string]: string;
    arrow: string;
    buttonContainer: string;
    input: string;
    form: string;
    submitButton: string;
  }
}

declare const FormEditorScssModule: FormEditorScssNamespace.IFormEditorScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FormEditorScssNamespace.IFormEditorScss;
};

export = FormEditorScssModule;
