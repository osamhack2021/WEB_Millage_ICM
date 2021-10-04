import * as React from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import {
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

type DateRangeType = [Date?, Date?] | null;

interface Props {
  handleClose: () => void
  handleSubmit: () => void
}

const DeleteModal: React.FC<Props> = ({handleClose, handleSubmit}) => {
  const [dateRange, setDateRange] = React.useState<
    DateRangeType
  >([new Date(), new Date()]);

  const handleDate = (val: DateRangeType) => {
    if (Array.isArray(val)) setDateRange(val);
  };

  return (
    <>
      <DialogTitle>일정 삭제하기</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          fullWidth
          margin='dense'
          label='제목'
        />
        <TextField
          required
          fullWidth
          margin='dense'
          label='내용'
          id='event-contents'
        />
        <div style={{minHeight: 375}}>
          <label>기간: </label>
          <DateTimeRangePicker
            value={dateRange}
            onChange={handleDate}
            locale='en-US'
            format='y. MM. dd H:mm'
            disableClock
            returnValue='range'
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleSubmit}>삭제</Button>
      </DialogActions>
    </>
  );
};

export default DeleteModal;
