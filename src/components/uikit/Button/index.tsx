import React, {FC, PropsWithChildren} from 'react';
import classNames from 'classnames';

import {ButtonComponentProps} from '../shared/types';
import styles from './button.scss';

const Button: FC<PropsWithChildren<ButtonComponentProps>> = ({type, onClick, className, children}) => {
  return (
    <button type={type} onClick={onClick} className={classNames(styles.button, className)}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'submit',
  onClick: () => {},
};

export default Button;
