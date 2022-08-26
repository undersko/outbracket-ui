import React, {FunctionComponent, SyntheticEvent, MouseEvent, useState, useEffect, useRef} from 'react';
import classNames from 'classnames';
import {Transition} from 'react-transition-group';

import {ActionDropDownComponentProps} from '../shared/types';
import styles from './actionDropDown.scss';

const ActionDropDown: FunctionComponent<ActionDropDownComponentProps> = ({options, onAction, className, children}) => {
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleClickOutside = (e: Event) => {
    const target = e.target as HTMLElement;
    if (wrapperRef.current && !wrapperRef.current.contains(target)) {
      setIsOptionsOpened(false);
    }
  };
  const onContainerClick = (e: SyntheticEvent) => {
    setIsOptionsOpened((prevState) => !prevState);
  };

  const handleClick = (e: MouseEvent<HTMLLIElement>, id: number) => {
    onAction(e, id);
    setIsOptionsOpened((prevState) => !prevState);
  };

  return (
    <div ref={wrapperRef} className={classNames(styles.container, className)}>
      <div onClick={onContainerClick}>{children}</div>
      <Transition in={isOptionsOpened} mountOnEnter unmountOnExit timeout={150}>
        {(state) => (
          <div className={classNames(styles.optionsContainer, styles[state])}>
            <ul>
              {options.map((option) => (
                <li className={styles.option} key={option.id} onClick={(e) => handleClick(e, option.id)}>
                  {option.element}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Transition>
    </div>
  );
};

ActionDropDown.defaultProps = {
  onAction: () => {},
};

export default ActionDropDown;
