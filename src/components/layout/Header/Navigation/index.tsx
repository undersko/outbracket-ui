import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import classNames from 'classnames';

import {PAGES} from '@constants/pages';

import GroupedOptions from './GroupedOptions';

import styles from './navigation.scss';

export enum Theme {
  row = 'row',
  column = 'column',
}

type NavigationProps = {
  theme: Theme;
};

type LinkType = {
  to: string;
  isGrouped: boolean;
  text: string;
  glyph: string;
  options?: {
    to: string;
    text: string;
    glyph: string;
  }[];
};

const Navigation: FC<NavigationProps> = ({theme}) => {
  const {t} = useTranslation();
  const links: LinkType[] = [
    {
      to: PAGES.CALENDAR,
      isGrouped: false,
      text: t('calendar.title'),
      glyph: '',
    },
    {
      to: PAGES.COMMUNITIES,
      isGrouped: false,
      text: t('communities.title'),
      glyph: '',
    },
    {
      to: 'create',
      isGrouped: true,
      text: t('common.create'),
      options: [
        {
          to: PAGES.CREATE_TOURNAMENT,
          text: t('new_tournament.title'),
          glyph: '',
        },
        {
          to: PAGES.CREATE_EVENT,
          text: t('new_event.title'),
          glyph: '',
        },
        {
          to: PAGES.CREATE_COMMUNITY,
          text: t('new_community.title'),
          glyph: '',
        },
      ],
      glyph: '',
    },
  ];

  const renderLink = (linkObj: LinkType, index: number) => {
    return (
      <li key={linkObj.to} className={styles.link}>
        {!linkObj.isGrouped ? (
          <Link className={styles.linkA} to={linkObj.to}>
            <i className={classNames(styles.linkIcon, styles[`order-${index}`])} />
            {linkObj.text}
          </Link>
        ) : (
          <GroupedOptions
            options={linkObj.options as {to: string; text: string}[]}
            title={linkObj.text}
            iconClassName={classNames(styles.linkIcon, styles[`order-${index}`])}
          />
        )}
      </li>
    );
  };

  return (
    <nav className={styles.nav}>
      <ul className={classNames(styles.list, styles[theme])}>
        {links.map((linkObj, index) => renderLink(linkObj, index))}
      </ul>
    </nav>
  );
};

export default Navigation;
