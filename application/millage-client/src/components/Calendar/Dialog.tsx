import * as React from 'react';
import {
  Button,
  Dialog as _Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

interface Props {
  visible: boolean
  handleOpen: () => void
  handleClose: () => void
};

const Dialog: React.FC<Props> = ({visible, handleOpen, handleClose}) => {
  const [value, setValue] = React.useState<
    [Date?, Date?] | null
  >([new Date(), new Date()]);
  // setEvents([{
  //   id: '3',
  //   title: 'test',
  //   start: new Date(),
  // }, ...events]);

  return (
    <_Dialog
      open={visible}
      onClose={handleClose}
    >
      <DialogTitle>일정 선택</DialogTitle>
      <DialogContent>
        <DateTimeRangePicker
          value={value}
          onChange={setValue}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleClose}>추가</Button>
      </DialogActions>
    </_Dialog>
  );
};

export default Dialog;
