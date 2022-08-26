import React, {FC} from 'react';
import styles from './centeredContainer.scss';

type CenteredContainerProps = {};

const CenteredContainer: FC<CenteredContainerProps> = ({children}) => {
  return <div className={styles.container}>{children}</div>;
};

export default CenteredContainer;
