import * as React from 'react';
import {useSchedule} from '@hooks/Schedule';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
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

type DateTime = Date | [Date, Date] | null;

interface IFormInput {
  scheduleTitle: string;
  scheduleContent: string;
  scheduleDate: DateTime;
}

interface Props {
  handleClose: () => void
}

const AddModal: React.FC<Props> = ({handleClose}) => {
  const [checked, setChecked] = React.useState(false);
  const {control, handleSubmit} = useForm<IFormInput>();
  const [
    _scheduleList,
    createSchedule,
  ] = useSchedule();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (checked) {
      const date = data.scheduleDate as Date;
      createSchedule({
        title: data.scheduleTitle,
        content: data.scheduleTitle,
        start: date,
      });
    } else {
      const date = data.scheduleDate as [Date, Date];
      createSchedule({
        title: data.scheduleTitle,
        content: data.scheduleTitle,
        start: date[0],
        end: date[1],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>일정 추가하기</DialogTitle>
      <DialogContent style={{overflowX: 'hidden'}}>
        <Controller
          name='scheduleTitle'
          control={control}
          render={({field}) => (
            <TextField
              label='제목'
              autoFocus
              required
              fullWidth
              margin='dense'
              {...field}
            />
          )}
        />
        <Controller
          name='scheduleContent'
          control={control}
          render={({field}) => (
            <TextField
              label='내용'
              required
              fullWidth
              margin='dense'
              {...field}
            />
          )}
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
        {checked ? (
          <Controller
            name='scheduleDate'
            control={control}
            render={({field: {onChange, value, ...props}}) => {
              const handleDate = (e: [Date?, Date?] | null) => {
                if (Array.isArray(e)) onChange(e);
              };
              return (
                <div style={{minHeight: 375}}>
                  <label>기간: </label>
                  <DateTimeRangePicker
                    value={value}
                    onChange={handleDate}
                    locale='en-US'
                    format='y. MM. dd H:mm'
                    disableClock
                    {...props}
                  />
                </div>
              );
            }}
          />
        ) : (
          <Controller
            name='scheduleDate'
            control={control}
            defaultValue={new Date()}
            render={({field: {onChange, value, ...props}}) => {
              const handleDate = (e: Date | null) => {
                if (Array.isArray(e)) onChange(e);
              };
              return (
                <div style={{minHeight: 375}}>
                  <label>일자: </label>
                  <DateTimePicker
                    value={value}
                    onChange={handleDate}
                    locale='en-US'
                    format='y. MM. dd H:mm'
                    disableClock
                    {...props}
                  />
                </div>
              );
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
        <Button type='submit'>추가</Button>
      </DialogActions>
    </form>
  );
};

export default AddModal;
