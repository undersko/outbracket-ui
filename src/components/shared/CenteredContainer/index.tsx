import React, {FC, PropsWithChildren} from 'react';
import styles from './centeredContainer.scss';

type CenteredContainerProps = {};

const CenteredContainer: FC<PropsWithChildren<CenteredContainerProps>> = ({children}) => {
  return <div className={styles.container}>{children}</div>;
};

export default CenteredContainer;
