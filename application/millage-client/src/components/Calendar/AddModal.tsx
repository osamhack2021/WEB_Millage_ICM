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
  handleSubmit: (e?: any) => void
}

const AddModal: React.FC<Props> = ({handleClose, handleSubmit}) => {
  const [dateRange, setDateRange] = React.useState<
    DateRangeType
  >([new Date(), new Date()]);

  const handleDateRange = (val: DateRangeType) => {
    if (Array.isArray(val)) setDateRange(val);
  };

  return (
    <>
      <DialogTitle>일정 추가하기</DialogTitle>
      <DialogContent>
        <TextField
          label='제목'
          autoFocus
          required
          fullWidth
          margin='dense'
        />
        <TextField
          label='내용'
          required
          fullWidth
          margin='dense'
        />
        <div style={{minHeight: 375}}>
          <label>기간: </label>
          <DateTimeRangePicker
            value={dateRange}
            onChange={handleDateRange}
            locale='en-US'
            format='y. MM. dd H:mm'
            disableClock
            returnValue='range'
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
        <Button onClick={handleSubmit}>추가</Button>
      </DialogActions>
    </>
  );
};

export default AddModal;
