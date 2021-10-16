import React from 'react';


const InputTitle: React.FC = ({children}) => {
  return (
    <h3 className='mb-2 sm:mb-0 text-lg mr-6'>
      {children}
    </h3>
  );
};

export default InputTitle;
