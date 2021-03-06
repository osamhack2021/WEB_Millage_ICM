import * as React from 'react';
import {Dialog as _Dialog, useMediaQuery, useTheme} from '@mui/material';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import 'react-calendar/dist/Calendar.css';

type StateTypes = 'add' | 'edit' | 'delete';

interface Props {
  visible: boolean
  handleClose: () => void
  state: StateTypes
};

const Dialog: React.FC<Props> = ({visible, handleClose, state}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <_Dialog
      fullScreen={fullScreen}
      open={visible}
      onClose={handleClose}
    >
      {
        state === 'add' ?
        <AddModal handleClose={handleClose} /> :
        <DeleteModal handleClose={handleClose} />
      }
    </_Dialog>
  );
};

export default Dialog;
