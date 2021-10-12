import React from 'react';
import {Board} from '@modules/board/types';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router';
import {SubmitHandler, useForm} from 'react-hook-form';
import {BOARD_PATH} from '@constants';
import {useBoardViewPath} from '@hooks/board';

type Props = Pick<Board, 'auth'>;
type SearchInput = {
  query: string;
}

const BoardBoxTop: React.FC<Props> = ({auth}) => {
  const history = useHistory();
  const {query, boardId} = useBoardViewPath();

  const {register, handleSubmit} = useForm<SearchInput>({
    defaultValues: {
      query: (typeof query === 'string') ? query : '',
    },
  });
  const onSubmit: SubmitHandler<SearchInput> = ({query}) => {
    if (query === '') {
      history.push(`${BOARD_PATH}/${boardId}/`);
    }
    history.push(`${BOARD_PATH}/${boardId}/?query=${query}`);
  };

  return (
    <div className='flex items-center justify-between'>
      <div className='flex'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('query')}
            className='border-b border-gray-500 focus:outline-none p-2'
            type='search'
            placeholder='검색어를 입력하세요'
          />
        </form>
        <button className='py-2 px-4 border border-gray-500 ml-4'>
          내가 쓴 글
        </button>
      </div>

      { auth === 1 &&
        <Link
          to='/create'
          className='px-4 py-2 ring-1 ring-gray-500'
        >
          글 생성
        </Link>
      }
    </div>
  );
};

export default BoardBoxTop;
