import * as React from 'react';
import {useSchedule} from '@hooks/Schedule';
import type {Schedule} from '@modules/Schedule/types';
import moment from 'moment';
import Calendar from 'react-calendar';
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  Stepper,
  Step,
  TextField,
  StepLabel,
} from '@mui/material';

interface Props {
  handleClose: () => void
}

const steps = ['삭제하고 싶은 날짜 선택', '삭제하고 싶은 일정 선택'];
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

const DeleteModal: React.FC<Props> = ({handleClose}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
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
    _updateSchedule,
    deleteSchedule,
  ] = useSchedule();
  const handleDelete = () => {
    deleteSchedule({id: selectedSchedule.id});
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
    setSelectedSchedule(e);
    setActiveStep(2);
  };

  return (
    <React.Fragment>
      <DialogTitle>일정 삭제하기</DialogTitle>
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
                if(groupId === 'unit') return false;
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
            <DialogContentText>해당 일정을 삭제하시겠습니까?</DialogContentText>
            <TextField
              value={selectedSchedule.title}
              label='제목'
              variant='filled'
              fullWidth
              disabled
            />
            <TextField
              value={selectedSchedule.content}
              label='내용'
              variant='filled'
              fullWidth
              disabled
            />
            <TextField
              value={
                moment(selectedSchedule.start).format('YYYY-MM-DD HH:mm') +
                selectedSchedule.end !== undefined ? '' :
                ' - ' + moment(selectedSchedule.end).format('YYYY-MM-DD HH:mm')
              }
              label='날짜'
              variant='filled'
              fullWidth
              disabled
            />
          </React.Fragment>
        )}
      </DialogContent>
      <DialogActions>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Button onClick={handleClose}>닫기</Button>
            <Button onClick={handleDelete}>삭제</Button>
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

export default DeleteModal;
