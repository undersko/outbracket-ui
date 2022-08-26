import React, {FunctionComponent} from 'react';

import {ErrorMessageComponentProps} from '../../shared/types';
import styles from './errorMessage.scss';

const ErrorMessage: FunctionComponent<ErrorMessageComponentProps> = ({text}) => {
  return <div className={styles.container}>{text}</div>;
};

export default ErrorMessage;
