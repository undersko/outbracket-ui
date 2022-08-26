declare namespace TextareaScssNamespace {
  export interface ITextareaScss {
    [key: string]: string;
    default: string;
    formControl: string;
    textareaContainer: string;
    ribbon: string;
    label: string;
  }
}

declare const TextareaScssModule: TextareaScssNamespace.ITextareaScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TextareaScssNamespace.ITextareaScss;
};

export = TextareaScssModule;
