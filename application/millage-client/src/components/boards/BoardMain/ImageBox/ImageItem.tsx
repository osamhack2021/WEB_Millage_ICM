import React from 'react';

type Props = {
  title: string;
}

const ImageItem: React.FC<Props> = ({title}) => {
  return (
    <div>
      {title}
    </div>
  );
}

export default ImageItem;
