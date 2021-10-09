import React, {useEffect} from 'react';
import {useBoard} from '@hooks/board';
import {useParams} from 'react-router';

type Params = {
  postId: string;
}

function PostViewPage() {
  const {postState, getPost} = useBoard();
  const {postId} = useParams<Params>();

  useEffect(() => {
    getPost({postId: +postId});
  }, []);

  console.log(postState);

  return (
    <div>
      Post View Page
    </div>
  );
}

export default PostViewPage;
