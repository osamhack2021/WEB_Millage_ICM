import * as React from 'react';
import {useSchedule} from '@hooks/Schedule';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import DateTimePicker from 'react-datetime-picker';
import {
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

interface Props {
  handleClose: () => void
}

const AddModal: React.FC<Props> = ({handleClose}) => {
  const [checked, setChecked] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [dateTimeRange, setDateTimeRange] = React.useState<[Date, Date]>([
    new Date(), new Date(),
  ]);
  const [
    _scheduleList,
    createSchedule,
  ] = useSchedule();

  const handleDate = (e: Date | null) => {
    if (e instanceof Date) setDate(e);
  };

  const handleDateTimeRange = (e: [Date?, Date?] | null) => {
    if (Array.isArray(e)) {
      setDateTimeRange([
        e[0] ?? new Date(),
        e[1] ?? new Date(),
      ]);
    }
  };

  const handleSubmit = () => {
    if (checked) {
      createSchedule({
        title,
        content,
        start: date,
      });
    } else {
      createSchedule({
        title,
        content,
        start: dateTimeRange[0],
        end: dateTimeRange[1],
      });
    }
    handleClose();
  };

  return (
    <div>
      <DialogTitle>일정 추가하기</DialogTitle>
      <DialogContent style={{overflowX: 'hidden'}}>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label='제목'
          autoFocus
          required
          fullWidth
          margin='dense'
        />
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          label='내용'
          required
          fullWidth
          margin='dense'
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            }
            label="종일"
          />
        </FormGroup>
        {!checked ? (
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
        ) : (
          <div style={{minHeight: 375}}>
            <label>일자: </label>
            <DateTimePicker
              value={date}
              onChange={handleDate}
              locale='ko'
              calendarType='US'
              format='y. MM. dd H:mm'
              disableClock
              formatDay={(locale, date) => date.getDate().toString()}
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
        <Button onClick={handleSubmit}>추가</Button>
      </DialogActions>
    </div>
  );
};

export default AddModal;
