import {StyleOverWriteProps} from '@utils/commonTypes';
import React from 'react';

type Props = StyleOverWriteProps & {
  onClick?: React.MouseEventHandler;
};

const Button: React.FC<Props> = ({
  children, className, onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${className}
        bg-green hover:bg-green-dark transition duration-500
        text-white font-bold self-center
        py-2 focus:outline-none
        flex items-center justify-center
      `}
    >
      {children}
    </button>
  );
};

export default Button;
