import * as React from 'react';
import {useSchedule} from '@hooks/Schedule';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import {
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

type DateRangeType = [Date, Date?];

interface IFormInput {
  scheduleTitle: string
  scheduleContent: string
  scheduleDate: DateRangeType
}

interface Props {
  handleClose: () => void
}

const AddModal: React.FC<Props> = ({handleClose}) => {
  const {control, handleSubmit} = useForm<IFormInput>();
  const [
    _scheduleList,
    createSchedule,
  ] = useSchedule();

  const onSubmit: SubmitHandler<IFormInput> = (data) => createSchedule({
    id: '100',
    groupId: '1',
    title: data.scheduleTitle,
    content: data.scheduleTitle,
    start: data.scheduleDate[0],
    end: data.scheduleDate[1],
  });

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
        <Controller
          name='scheduleDate'
          control={control}
          defaultValue={[new Date(), new Date()]}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
        <Button type='submit'>추가</Button>
      </DialogActions>
    </form>
  );
};

export default AddModal;
