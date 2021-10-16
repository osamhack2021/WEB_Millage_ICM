import React from 'react';
import {useHistory} from 'react-router';
import {SubmitHandler, useForm} from 'react-hook-form';
import {BOARD_PATH} from '@constants';
import {useBoardViewPath} from '@hooks/board';


type SearchInput = {
  query: string;
}

const SearchBox: React.FC = () => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full ring-1 ring-gray-500 flex items-center justify-between'
    >
      <input
        {...register('query')}
        className='focus:outline-none w-full px-4 py-3'
        type='search'
        placeholder='검색어를 입력하세요'
      />
    </form>
  );
};

export default SearchBox;
