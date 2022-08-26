import React, {useState, useEffect, FC, ReactElement} from 'react';
import classNames from 'classnames';
import styles from './icon.scss';

type IconGlyphs =
  | 'account'
  | 'arrow-right'
  | 'error'
  | 'info'
  | 'logo'
  | 'success'
  | 'warning'
  | 'edit'
  | 'upload'
  | 'delete';

type IconProps = {
  glyph: IconGlyphs;
  className?: string;
  onClick?: () => void;
};

const Icon: FC<IconProps> = ({glyph, className, onClick}) => {
  const [importedIcon, setImportedIcon] = useState<ReactElement | null>(null);
  useEffect(() => {
    if (glyph) {
      tryImportIcon();
    }
  }, []);

  const tryImportIcon = async () => {
    try {
      const {ReactComponent: ImportedIcon} = await import(`../../../icons/${glyph}.svg`);
      setImportedIcon(<ImportedIcon className={classNames(styles.svg, className)} onClick={onClick} />);
    } catch {}
  };

  return importedIcon;
};

export default Icon;
