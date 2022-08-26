import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import styles from './groupedOptions.scss';

type Option = {
  to: string;
  text: string;
};

type GroupedOptionsProps = {
  title: string;
  iconClassName: string;
  options: Option[];
};

const GroupedOptions: FC<GroupedOptionsProps> = ({title, options, iconClassName}) => {
  const [showOptions, setShowOptions] = useState(false);

  const renderLink = (linkObj: Option) => {
    return (
      <li key={linkObj.to} className={styles.groupedLinks}>
        <Link className={styles.groupedLink} to={linkObj.to}>
          {linkObj.text}
        </Link>
      </li>
    );
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <a className={styles.link}>
        <i className={iconClassName} />
        {title}
      </a>
      <div className={styles.groupedContainer}>
        <CSSTransition
          in={showOptions}
          classNames={{
            enter: styles['slide-enter'],
            enterActive: styles['slide-enter-active'],
            enterDone: styles['slide-enter-done'],
            exitDone: styles['slide-exit-done'],
          }}
          timeout={300}
        >
          <ul className={styles.groupedOptions}>{options.map((linkObj) => renderLink(linkObj))}</ul>
        </CSSTransition>
      </div>
    </div>
  );
};

export default GroupedOptions;
