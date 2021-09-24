import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getMessageBoxListAsync} from '@modules/DM/actions';

const MessageBoxes = () => {
  const dispatch = useDispatch();

  const messageboxes = useSelector((state: any) => state.DM.messageboxes);

  useEffect(() => {
    dispatch(getMessageBoxListAsync.request());
  }, [dispatch]);


  const renderMessageBoxes = () => {
    return messageboxes.map((mb : any) => {
      return (<div key={mb.id}>{mb.content}</div>);
    });
  };

  return (
    <div id="messageboxes">
      <h2>메시지 함</h2>
      <div className="items">
        {renderMessageBoxes()}
      </div>
    </div>
  );
};

export default MessageBoxes;
