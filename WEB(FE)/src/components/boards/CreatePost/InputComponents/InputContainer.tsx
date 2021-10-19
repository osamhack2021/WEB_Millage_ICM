import React from 'react';
import {StyleOverWriteProps} from '@utils/commonTypes';

type Props = StyleOverWriteProps;

const InputContainer: React.FC<Props> = ({className, children}) => {
  return (
    <div
      className={`${className}
        flex flex-col items-start sm:flex-row w-full
      `}
      // style={{
      //   minWidth: '480px',
      // }}
    >
      {children}
    </div>
  );
};

export default InputContainer;
