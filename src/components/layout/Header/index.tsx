import React, {ReactNode} from 'react';
import classNames from 'classnames';

import Separator from '@shared/Separator';
import HideComponent from '@shared/HideComponent';

import Navigation, {Theme} from './Navigation';
import Account from './Account';
import Logo from './Logo';
import styles from './header.scss';

const Header = () => {
  const renderSeparatedBlock = (innerComponent: ReactNode, style: string, withSeparator = true) => {
    return (
      <div className={styles.separatedBlock}>
        <HideComponent isHide={!withSeparator}>
          <Separator className={styles.separator} />
        </HideComponent>
        <div className={classNames(styles.innerBlockContainer, style)}>{innerComponent}</div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.desktopOnlyContainer}>
        {renderSeparatedBlock(<Logo />, styles.logoColumn, false)}
        {renderSeparatedBlock(<Navigation theme={Theme.row} />, styles.navigationColumn)}
        {renderSeparatedBlock(<Account />, styles.authColumn)}
      </div>
    </div>
  );
};

export default Header;
