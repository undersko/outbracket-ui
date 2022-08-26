import React, {FC} from 'react';
import classNames from 'classnames';
import styles from './separator.scss';

type SeparatorProps = {
  className: string;
};

const Separator: FC<SeparatorProps> = ({className}) => {
  return <div className={classNames(styles.separator, className)} />;
};

export default Separator;
