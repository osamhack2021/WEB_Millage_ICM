import * as React from 'react';
import {DatePicker, Modal} from 'antd';
import 'antd/dist/antd.css';

interface Props {
  visible: boolean
  handleOpen: () => void
  handleClose: () => void
};

const Dialog: React.FC<Props> = ({visible, handleOpen, handleClose}) => {
  // setEvents([{
  //   id: '3',
  //   title: 'test',
  //   start: new Date(),
  // }, ...events]);
  return (
    <Modal
      title='일정 선택'
      visible={visible}
      onCancel={handleClose}
      footer={null}
      centered
    >
      <DatePicker.RangePicker showTime placeholder={['시작 날짜', '종료 날짜']}/>
    </Modal>
  );
};

export default Dialog;
