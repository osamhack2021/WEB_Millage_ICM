import React from 'react';
import {Board} from '@modules/board/types';
import PostListItem from '@components/boards/PostListItem';
import {FilledButton} from '@components/common';

type Props = Pick<Board, 'paginationObject'> & {
  getBoardWithPage: (page: number) => void,
}

const PostListBox: React.FC<Props> = ({
  paginationObject, getBoardWithPage,
}) => {
  const {
    curPage,
    results,
    totalPages,
  } = paginationObject;

  const isFirstPage = curPage === 1;
  const isLastPage = curPage === totalPages;

  const onPrevButton = () => getBoardWithPage(curPage - 1);
  const onNextButton = () => getBoardWithPage(curPage + 1);

  return (
    <div className='w-full mt-4'>
      {results.map(( post ) => (
        <PostListItem key={post.id} post={post} type='boardView' />
      ))}

      {/* Pagination Button */}
      {
        (!isFirstPage || !isLastPage) &&
        <div className='w-full mt-4 p-1 flex justify-end items-center'>
          {
            !isFirstPage &&
            <FilledButton
              onClick={onPrevButton}
              className='py-2 w-16 text-md'
            >
              이전
            </FilledButton>
          }

          <div> &nbsp; </div>

          {
            !isLastPage &&
            <FilledButton
              onClick={onNextButton}
              className='py-2 w-16 text-md'
            >
              다음
            </FilledButton>
          }
        </div>
      }
    </div>
  );
};

export default PostListBox;
