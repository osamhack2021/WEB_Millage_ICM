import { StyleOverWriteProps } from '@utils/commonTypes';
import React from 'react';

type Props = StyleOverWriteProps;

const Button: React.FC<Props> = ({children, className}) => {
  return(
    <button
      className={`
        ${className}
        bg-green hover:bg-green-dark transition duration-500
        text-lg text-white font-bold self-center
        w-72 py-2 mt-8 focus:outline-none
        flex items-center justify-center
      `}
    >
      {children}
    </button>
  );
};

export default Button;
