import React, {ReactNode} from 'react';

export type ToastAppearanceTypes = 'error' | 'info' | 'success' | 'warning';
export type ToastTransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

export type ToastOptions = {
  appearance: ToastAppearanceTypes;
  autoDismiss?: boolean;
};

export type ToastObject = {
  content: ReactNode;
  id: string;
  options: ToastOptions;
  title?: string;
};

export type ToastProps = ToastObject & {
  transitionState: ToastTransitionState;
  onClose: () => void;
};

export type ToastsHook = {
  addToast: ((content: ReactNode, options: ToastOptions, title?: string) => string) | (() => void);
  removeToast: ((id: string) => void) | (() => void);
};
