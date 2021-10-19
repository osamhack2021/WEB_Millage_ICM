import {RootState} from '@modules';
import {useSelector} from 'react-redux';


function useUser() {
  const session = useSelector(
      (state: RootState) => state.user.session,
  );

  return {
    session,
  };
}

export default useUser;
