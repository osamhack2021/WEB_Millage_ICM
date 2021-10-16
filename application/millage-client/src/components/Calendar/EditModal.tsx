import * as React from 'react';
import {useSchedule} from '@hooks/Schedule';
import type {Schedule} from '@modules/Schedule/types';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import Calendar from 'react-calendar';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import DateTimePicker from 'react-datetime-picker';
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  Stepper,
  Step,
  TextField,
  StepLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

interface IFormInput {
  scheduleTitle: string;
  scheduleContent: string;
  scheduleDateRange: [Date, Date?];
  scheduleDate: Date;
}

interface Props {
  handleClose: () => void
}

const steps = ['변경하고 싶은 날짜 선택', '변경하고 싶은 일정 선택'];

const EditModal: React.FC<Props> = ({handleClose}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [checked, setChecked] = React.useState(false);
  const [selectedSchedule, setSelectedSchedule] = React.useState<Schedule>({
    id: '',
    groupId: 'person',
    title: '',
    content: '',
    start: new Date(),
  });
  const {control, handleSubmit} = useForm<IFormInput>();
  const [
    scheduleList,
    _createSchedule,
    updateSchedule,
    _deleteSchedule,
  ] = useSchedule();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (checked) {
      updateSchedule({
        id: selectedSchedule.id,
        title: data.scheduleTitle,
        content: data.scheduleTitle,
        start: data.scheduleDate,
      });
    } else {
      updateSchedule({
        id: selectedSchedule.id,
        title: data.scheduleTitle,
        content: data.scheduleTitle,
        start: data.scheduleDateRange[0],
        end: data.scheduleDateRange[1],
      });
    }
    handleClose();
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleDate = (val: Date) => {
    setSelectedDate(val);
    setActiveStep(1);
  };
  const handleItemClick = (e: Schedule) => {
    setChecked(e.end === undefined);
    setSelectedSchedule(e);
    setActiveStep(2);
  };

  const compareDate = (a: Date, b: Date) => (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
  const compareDateRange = (start: Date, end: Date, date: Date) => {
    const startDate = new Date(
        start.getFullYear(), start.getMonth(), start.getDate(),
    );
    const endDate = new Date(
        end.getFullYear(), end.getMonth(), end.getDate() + 1,
    );
    return startDate <= date && date < endDate;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>일정 편집하기</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === 0 ? (
          <div style={{width: 'fit-content', margin: '1em auto'}}>
            <Calendar
              value={selectedDate}
              onChange={handleDate}
              locale='en-US'
            />
          </div>
        ) : activeStep === 1 ? (
          <Box>
            <List>
              {scheduleList.filter(({groupId, start, end}) => {
                if (groupId === 'unit') return false;
                if (!end) {
                  return compareDate(start, selectedDate);
                } else {
                  return compareDateRange(start, end, selectedDate);
                }
              }).map((schedule) => (
                <ListItem key={schedule.id} disablePadding>
                  <ListItemButton onClick={() => handleItemClick(schedule)}>
                    {schedule.title}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <React.Fragment>
            <Controller
              name='scheduleTitle'
              control={control}
              defaultValue={selectedSchedule?.title}
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
              defaultValue={selectedSchedule?.content}
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
            {!checked ? (
              <Controller
                name='scheduleDateRange'
                control={control}
                defaultValue={[selectedSchedule.start, selectedSchedule.end]}
                render={({field: {onChange, value}}) => {
                  const handleDate = (e: [Date?, Date?] | null) => {
                    if (Array.isArray(e)) onChange(e);
                  };
                  return (
                    <div style={{minHeight: 375}}>
                      <label>기간: </label>
                      <DateTimeRangePicker
                        value={value}
                        onChange={handleDate}
                        locale='ko'
                        calendarType='US'
                        format='y. MM. dd H:mm'
                        disableClock
                        formatDay={(locale, date) => date.getDate().toString()}
                      />
                    </div>
                  );
                }}
              />
            ) : (
              <Controller
                name='scheduleDate'
                control={control}
                defaultValue={selectedSchedule.start}
                render={({field: {onChange, value}}) => {
                  const handleDate = (e: Date | null) => {
                    if (e instanceof Date) onChange(e);
                  };
                  return (
                    <div style={{minHeight: 375}}>
                      <label>일자: </label>
                      <DateTimePicker
                        value={value}
                        onChange={handleDate}
                        locale='ko'
                        calendarType='US'
                        format='y. MM. dd H:mm'
                        disableClock
                        formatDay={(locale, date) => date.getDate().toString()}
                      />
                    </div>
                  );
                }}
              />
            )}
          </React.Fragment>
        )}
      </DialogContent>
      <DialogActions>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Button onClick={handleClose}>닫기</Button>
            <Button type='submit'>변경</Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button onClick={handleClose}>닫기</Button>
            <Button onClick={handleBack}>이전</Button>
          </React.Fragment>
        )}
      </DialogActions>
    </form>
  );
};

export default EditModal;
