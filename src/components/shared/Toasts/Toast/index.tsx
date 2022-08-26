import React, {FunctionComponent} from 'react';
import classNames from 'classnames';

import Icon from '../../Icon';

import {ToastProps} from '../../types';

import styles from './toast.scss';

const Toast: FunctionComponent<ToastProps> = ({transitionState, content, id, options, title, onClose}) => {
  return (
    <div className={classNames(styles.toast, styles[options.appearance], styles[transitionState])}>
      <div className={styles.iconContainer}>
        <Icon glyph={options.appearance} />
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.title}>{title || options.appearance}</div>
        {content}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default Toast;
