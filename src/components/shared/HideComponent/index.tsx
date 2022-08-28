import React, {FC, PropsWithChildren, Fragment} from 'react';

type HideComponentProps = {
  isHide: Boolean;
};

const HideComponent: FC<PropsWithChildren<HideComponentProps>> = ({children, isHide}) => {
  return !isHide ? <Fragment>{children}</Fragment> : null;
};

export default HideComponent;
