import React from 'react';
import classNames from 'classnames';

const Layout = ({ children, rtl }) => {
  return (
    <div
      className={classNames(
        'main-wrapper',
        'main-wrapper-responsive-lg',
        rtl && 'rtl'
      )}>
      {children}
    </div>
  );
};

export default Layout;
