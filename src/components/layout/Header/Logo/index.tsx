import React from 'react';
import {useNavigate} from 'react-router-dom';
import Icon from '@shared/Icon';
import {PAGES} from '@constants/pages';
import styles from './logo.scss';

const Logo = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate(PAGES.LOGIN, {replace: true});
  };

  return (
    <div className={styles.logoContainer} onClick={handleClick}>
      <Icon className={styles.logo} glyph="logo" />
      <span>OUTBRACKET</span>
    </div>
  );
};

export default Logo;
