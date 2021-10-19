import React from 'react';
import {POLL, RECRUIT} from '@constants';
import {NormalPost, PollPost, RecruitPost} from '@images';
import {Post} from '@modules/board/types';
import {StyleOverWriteProps} from '@utils/commonTypes';

type Props = Pick<Post, 'postType'> & StyleOverWriteProps

const PostTypeIcon: React.FC<Props> = ({postType, className}) => {
  let iconPath;

  switch (postType) {
    case POLL:
      iconPath = PollPost;
      break;

    case RECRUIT:
      iconPath = RecruitPost;
      break;

    default:
      iconPath = NormalPost;
  }

  return (
    <div
      className={`${className} h-4 w-4 mr-1 bg-cover`}
      style={{backgroundImage: `url(${iconPath})`}}
    />
  );
};

export default PostTypeIcon;
