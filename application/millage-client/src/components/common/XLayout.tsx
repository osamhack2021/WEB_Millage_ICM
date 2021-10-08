import React from 'react';
import {ClassNameProps} from '@utils/commonTypes';

type Props = ClassNameProps;

/**
 * Page 가로 Layout 컴포넌트\
 * 가로 길이를 최대 1280px로 설정하고, 양쪽 가로 margin을 auto로 설정
 * @return {React.FunctionComponent}
 */
const XLayout: React.FC<Props> = ({children, className}) => {
  return (
    <div className={`
      max-w-screen-xl mx-auto px-4 xl:p-0
      ${className}
    `}>
      {children}
    </div>
  );
};

export default XLayout;
