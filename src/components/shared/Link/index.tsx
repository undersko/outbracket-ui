import React, {AnchorHTMLAttributes, FC, FunctionComponent, MouseEventHandler} from 'react';
import classNames from 'classnames';
import styles from './link.scss';

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string;
  onClick?: MouseEventHandler;
  text: string;
};

const Link: FC<LinkProps> = ({className, onClick, text, ...rest}) => {
  return (
    <a className={classNames(styles.link, className)} onClick={onClick} {...rest}>
      {text}
    </a>
  );
};

export default Link;
