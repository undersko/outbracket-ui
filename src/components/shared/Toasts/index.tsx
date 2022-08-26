import React, {FunctionComponent, createContext, useState, useContext, ReactNode} from 'react';
import {v4 as uuidv4} from 'uuid';
import {Transition, TransitionGroup} from 'react-transition-group';

import {ToastObject, ToastOptions, ToastsHook, ToastTransitionState} from '../types';

import {NOOP} from '@constants/noop';

import Toast from './Toast';

import styles from './toasts.scss';

const ToastContext = createContext<ToastsHook>({addToast: NOOP, removeToast: NOOP});
const {Provider} = ToastContext;

type ToastsProps = {};

const Toasts: FunctionComponent<ToastsProps> = ({children}) => {
  const [toastList, setToastList] = useState<ToastObject[]>([]);

  const has = (id: string) => {
    if (!toastList.length) {
      return false;
    }

    return Boolean(!!toastList.find((toast) => toast.id === id));
  };

  const add = (content: ReactNode, options: ToastOptions, title?: string): string => {
    const id = uuidv4();
    const newToast: ToastObject = {content: content, id, options: options, title: title};

    setToastList((prevState) => [...prevState, newToast]);

    return id;
  };

  const remove = (id: string) => {
    setToastList(toastList.filter((toast) => toast.id !== id));
  };

  return (
    <Provider value={{addToast: add, removeToast: remove}}>
      <TransitionGroup className={styles.container}>
        {toastList.map((toast) => (
          <Transition timeout={500} mountOnEnter unmountOnExit key={toast.id}>
            {(state: ToastTransitionState) => (
              <Toast
                transitionState={state}
                options={toast.options}
                content={toast.content}
                id={toast.id}
                title={toast.title}
                onClose={() => remove(toast.id)}
              />
            )}
          </Transition>
        ))}
      </TransitionGroup>
      {children}
    </Provider>
  );
};

Toasts.propTypes = {};

export default Toasts;

export const useToasts = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw Error('The `useToasts` hook must be called from a descendent of the `ToastProvider`.');
  }

  return {
    addToast: context.addToast,
    removeToast: context.removeToast,
  };
};
