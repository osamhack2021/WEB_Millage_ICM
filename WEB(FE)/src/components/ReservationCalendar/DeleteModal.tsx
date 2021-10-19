import * as React from 'react';
import {useReservation} from '@hooks/reservation';
import {ReservationState} from '@modules/Reservation/types';
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

const steps = ['삭제하고 싶은 날짜 선택', '삭제하고 싶은 예약 선택'];
const compareDate = (a: Date, b: Date) => {
  try {
    return (
      new Date(a).getFullYear() === new Date(b).getFullYear() &&
      new Date(a).getMonth() === new Date(b).getMonth() &&
      new Date(a).getDate() === new Date(b).getDate()
    );
  } catch (err) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }
};
const compareDateRange = (start: Date, end: Date, date: Date) => {
  const startDate = new Date(
      start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate(),
  );
  const endDate = new Date(
      end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1,
  );
  return startDate <= date && date < endDate;
};

const DeleteModal: React.FC<Props> = ({handleClose}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [
    selectedReservation,
    setSelectedReservation,
  ] = React.useState<ReservationState>({
    id: '',
    groupId: '',
    title: '',
    start: new Date(),
    end: new Date(),
  });
  const [
    place,
    _createReservation,
    deleteReservation,
  ] = useReservation();
  const handleDelete = () => {
    deleteReservation({id: selectedReservation.id});
    handleClose();
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleDate = (val: Date) => {
    setSelectedDate(val);
    setActiveStep(1);
  };
  const handleItemClick = (e: ReservationState) => {
    setSelectedReservation(e);
    setActiveStep(2);
  };

  return (
    <React.Fragment>
      <DialogTitle>예약 취소하기</DialogTitle>
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
              locale='ko'
            />
          </div>
        ) : activeStep === 1 ? (
          <Box>
            <List>
              {place.reservations.filter(({start, end}) => {
                if (!end) {
                  return compareDate(start, selectedDate);
                } else {
                  return compareDateRange(new Date(start),
                      new Date(end), selectedDate);
                }
              }).map((reservation) => (
                <ListItem key={reservation.id} disablePadding>
                  <ListItemButton onClick={() => handleItemClick(reservation)}>
                    {reservation.title}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <React.Fragment>
            <DialogContentText>해당 일정을 삭제하시겠습니까?</DialogContentText>
            <TextField
              value={selectedReservation.title}
              label='내용'
              variant='filled'
              fullWidth
              disabled
            />
            <TextField
              value={
                moment(selectedReservation.start).subtract(9, 'hours').format('YYYY-MM-DD HH:mm') +
                ' - ' +
                moment(selectedReservation.end).subtract(9, 'hours').format('YYYY-MM-DD HH:mm')
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
