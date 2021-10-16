import React from 'react';
import {StyleOverWriteProps} from '@utils/commonTypes';

type Props = StyleOverWriteProps;

const InputContainer: React.FC<Props> = ({className, children}) => {
  return (
    <div className={`flex items-center w-full ${className}`}>
      {children}
    </div>
  );
};

export default InputContainer;
