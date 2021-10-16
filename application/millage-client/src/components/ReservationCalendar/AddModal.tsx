import * as React from 'react';
import {
  useReservation,
} from '@hooks/reservation';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import {
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface Props {
  handleClose: () => void
}

const AddModal: React.FC<Props> = ({handleClose}) => {
  const [
    place,
    createReservation,
  ] = useReservation();
  const [title, setTitle] = React.useState('');
  const [dateTimeRange, setDateTimeRange] = React.useState<[Date, Date]>([
    new Date(), new Date(),
  ]);

  const handleSubmit = () => {
    createReservation({
      title: title,
      start: dateTimeRange[0],
      end: dateTimeRange[1],
      placeId: place.id,
    });
    handleClose();
  };

  const handleDateTimeRange = (e: [Date?, Date?] | null) => {
    if (Array.isArray(e)) {
      setDateTimeRange([
        e[0] ?? new Date(),
        e[1] ?? new Date(),
      ]);
    }
  };

  return (
    <div>
      <DialogTitle>예약 신청하기</DialogTitle>
      <DialogContent style={{overflowX: 'hidden'}}>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label='내용'
          autoFocus
          required
          fullWidth
          margin='dense'
        />
        <div style={{minHeight: 375}}>
          <label>기간: </label>
          <DateTimeRangePicker
            value={dateTimeRange}
            onChange={handleDateTimeRange}
            locale='ko'
            calendarType='US'
            format='y. MM. dd H:mm'
            disableClock
            formatDay={(locale, date) => date.getDate().toString()}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
        <Button onClick={handleSubmit}>추가</Button>
      </DialogActions>
    </div>
  );
};

export default AddModal;
