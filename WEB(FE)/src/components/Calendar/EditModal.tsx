import * as React from 'react';
import {useSchedule} from '@hooks/Schedule';
import type {Schedule} from '@modules/Schedule/types';
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
import {useSelector} from 'react-redux';
import {RootState} from '@modules';

interface Props {
  handleClose: () => void
}

const steps = ['변경하고 싶은 날짜 선택', '변경하고 싶은 일정 선택'];

const EditModal: React.FC<Props> = ({handleClose}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const session = useSelector((state : RootState) => state.user.session);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [checked, setChecked] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [dateTimeRange, setDateTimeRange] = React.useState<[Date, Date]>([
    new Date(), new Date(),
  ]);
  const [selectedSchedule, setSelectedSchedule] = React.useState<Schedule>({
    id: '',
    groupId: 'person',
    title: '',
    content: '',
    start: new Date(),
  });
  const [
    scheduleList,
    _createSchedule,
    updateSchedule,
    _deleteSchedule,
  ] = useSchedule();

  const handleSubmit = () => {
    console.log(date);
    if (checked) {
      updateSchedule({
        id: selectedSchedule.id,
        title: selectedSchedule.title,
        content: selectedSchedule.content,
        start: date.toUTCString(),
        end: null,
      });
    } else {
      updateSchedule({
        id: selectedSchedule.id,
        title: selectedSchedule.title,
        content: selectedSchedule.content,
        start: dateTimeRange[0].toUTCString(),
        end: dateTimeRange[1].toUTCString(),
      });
    }
    handleClose();
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleSelectedDate = (val: Date) => {
    setSelectedDate(val);
    setActiveStep(1);
  };
  const handleItemClick = (e: Schedule) => {
    setChecked(e.end === undefined);
    setSelectedSchedule(e);
    if (e.end) {
      setDateTimeRange(
          [e.start,
            e.end]);
    } else setDate(e.start);
    setActiveStep(2);
  };

  const handleTitle = (e: string) => {
    setSelectedSchedule((prevE) => ({
      ...prevE,
      title: e,
    }));
  };
  const handleContent = (e: string) => {
    setSelectedSchedule((prevE) => ({
      ...prevE,
      content: e,
    }));
  };
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

  const compareDate = (a: Date) => {
    const startDate = new Date(
        a.getFullYear(), a.getMonth(), a.getDate(),
    );
    return (
      startDate.getFullYear() === selectedDate.getFullYear() &&
      startDate.getMonth() === selectedDate.getMonth() &&
      startDate.getDate() === selectedDate.getDate()
    );
  };
  const compareDateRange = (start: Date, end: Date) => {
    console.log(start);
    console.log(end);
    const startDate = new Date(
        start.getFullYear(), start.getMonth(), start.getDate(),
    );
    const endDate = new Date(
        end.getFullYear(), end.getMonth(), end.getDate() + 1,
    );

    return startDate <= selectedDate && selectedDate < endDate;
  };

  return (
    <div>
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
              onChange={handleSelectedDate}
              locale='ko'
              calendarType='US'
            />
          </div>
        ) : activeStep === 1 ? (
          <Box>
            <List>
              {scheduleList.filter(({groupId, start, end}) =>
                (
                end ?
                compareDateRange(start, end) :
                compareDate(start)
                ) && (session?.role.name == 'NORMAL_USER' ?
                  groupId == 'person':
                  true
                ),
              ).map((schedule) => (
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
            <TextField
              value={selectedSchedule.title}
              onChange={(e) => handleTitle(e.target.value)}
              label='제목'
              autoFocus
              required
              fullWidth
              margin='dense'
            />
            <TextField
              value={selectedSchedule.content}
              onChange={(e) => handleContent(e.target.value)}
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
              <div className='calendar-form-wrapper'>
                <label>기간: </label>
                <DateTimeRangePicker
                  value={dateTimeRange}
                  onChange={handleDateTimeRange}
                  locale='ko'
                  calendarType='US'
                  format='y. MM. dd H:mm'
                  disableClock
                  formatDay={(locale, date) =>
                    date.getDate().toString()}
                />
              </div>
            ) : (
              <div className='calendar-form-wrapper'>
                <label>일자: </label>
                <DateTimePicker
                  value={date}
                  onChange={handleDate}
                  locale='ko'
                  calendarType='US'
                  format='y. MM. dd H:mm'
                  disableClock
                  formatDay={(locale, date) =>
                    date.getDate().toString()}
                />
              </div>
            )}
          </React.Fragment>
        )}
      </DialogContent>
      <DialogActions>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Button onClick={handleClose}>닫기</Button>
            <Button onClick={handleSubmit}>변경</Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button onClick={handleClose}>닫기</Button>
            <Button onClick={handleBack}>이전</Button>
          </React.Fragment>
        )}
      </DialogActions>
    </div>
  );
};

export default EditModal;
