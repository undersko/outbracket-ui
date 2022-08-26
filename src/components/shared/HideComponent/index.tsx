import React, {FC, Fragment} from 'react';

type HideComponentProps = {
  isHide: Boolean;
};

const HideComponent: FC<HideComponentProps> = ({children, isHide}) => {
  return !isHide ? <Fragment>{children}</Fragment> : null;
};

export default HideComponent;
