import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {sendNewMessage} from '@modules/DM/actions';
import {useDispatch} from 'react-redux';
import './newmessage.css';
type Props = {
  receiverId: number;
  open: boolean;
  closeHandler: () => void;
};
const NewMessage :React.FC<Props> = ({closeHandler, open, receiverId}) => {
  const dispatch = useDispatch();
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const sendMessage = () => {
    dispatch(sendNewMessage({
      receiverId: receiverId,
      message: message,
      anonymous: anonymous,
    }));
    closeHandler();
  };

  useEffect(() => {
    if (open == true) {
      setMessage('');
    }
  }, [open]);

  return (
    <Dialog id="NewMessageDialog" onClose={closeHandler} open={open}>
      <IconButton
        aria-label="close"
        onClick={closeHandler}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>
        쪽지 보내기
      </DialogTitle>
      <DialogContent>
        <div>
          <textarea
            className="message"
            placeholder="내용을 입력해주세요"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}/>
        </div>
        <div className="buttonContainer">
          <button
            className="sendButton"
            onClick={sendMessage}>
              전송
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};


export default NewMessage;
