import {POLL, RECRUIT} from '@constants';
import {NormalPost, PollPost, RecruitPost} from '@images';
import {Post} from '@modules/board/types';
import React from 'react';

type Props = Pick<Post, 'postType'>

const PostTypeIcon: React.FC<Props> = ({postType}) => {
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
      className='h-4 w-4 mr-1 bg-cover'
      style={{backgroundImage: `url(${iconPath})`}}
    />
  );
};

export default PostTypeIcon;
