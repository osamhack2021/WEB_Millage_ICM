import * as React from 'react';
import {useSchedule} from '@hooks/Schedule';
import type {EventData} from '@modules/Schedule/types';
import Calendar from 'react-calendar';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
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
} from '@mui/material';

type DateRangeType = [Date?, Date?] | null;

interface Props {
  handleClose: () => void
  handleSubmit: (e?: any) => void
}

const steps = ['변경하고 싶은 날짜 선택', '변경하고 싶은 일정 선택'];
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

const EditModal: React.FC<Props> = ({handleClose, handleSubmit}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedSchedule, setSelectedSchedule] = React.useState<EventData>();
  const [dateRange, setDateRange] = React.useState<
    DateRangeType
  >([new Date(), new Date()]);

  const [
    scheduleList,
    _createSchedule,
    updateSchedule,
    _deleteSchedule,
  ] = useSchedule();

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleDate = (val: Date) => {
    setSelectedDate(val);
    setActiveStep(1);
  };
  const handleItemClick = (e: EventData) => {
    setSelectedSchedule(e);
    setActiveStep(2);
  };
  const handleDateRange = (val: DateRangeType) => {
    if (Array.isArray(val)) setDateRange(val);
  };

  return (
    <React.Fragment>
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
              {scheduleList.filter(({start, end}) => {
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
            <TextField
              label='제목'
              autoFocus
              required
              fullWidth
              margin='dense'
              defaultValue={selectedSchedule?.title}
            />
            <TextField
              label='내용'
              required
              fullWidth
              margin='dense'
              defaultValue={selectedSchedule?.content}
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
    </React.Fragment>
  );
};

export default EditModal;
