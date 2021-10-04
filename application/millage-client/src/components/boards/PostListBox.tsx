import React from 'react';
import {Post} from '@modules/board/types';
import {PaginationResults} from '@utils/commonTypes';
import PostListItem from './PostListItem';

type Props = {
  posts: PaginationResults<Post>,
  getBoardWithPage: (page: number) => void,
}

const PostListBox: React.FC<Props> = ({posts, getBoardWithPage}) => {
  const {
    curPage,
    results,
    totalPages,
  } = posts;

  const isFirstPage = curPage === 1;
  const isLastPage = curPage === totalPages;

  const onPrevButton = () => getBoardWithPage(curPage - 1);
  const onNextButton = () => getBoardWithPage(curPage + 1);

  return (
    <div className='mt-8'>
      {results.map(( post ) => (
        <PostListItem post={post} />
      ))}

      {/* Pagination Button */}
      {
        (!isFirstPage || !isLastPage) &&
        <div className='w-full mt-6 p-1 flex justify-between items-center'>
          {
            !isFirstPage &&
            <button
              onClick={onPrevButton}
              className='px-5 py-3 focus:outline-none ring-1 ring-gray-500'
            >
              이전 페이지
            </button>
          }

          <div> &nbsp; </div>

          {
            !isLastPage &&
            <button
              onClick={onNextButton}
              className='px-5 py-3 focus:outline-none ring-1 ring-gray-500'
            >
              다음 페이지
            </button>
          }
        </div>
      }
    </div>
  );
};

export default PostListBox;
