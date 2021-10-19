import React from 'react';
import {StyleOverWriteProps} from '@utils/commonTypes';

type Props = StyleOverWriteProps & {
  onClick: React.MouseEventHandler;
}

const OutlineButton: React.FC<Props> = ({
  onClick, children, className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
          ${className}
          px-2 py-1 focus:outline-none flex items-center text-base 
          border border-gray-300 hover:border-green-light
          transition duration-500 group
        `}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
