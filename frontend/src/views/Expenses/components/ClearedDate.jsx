import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Alert
} from 'reactstrap';

const ClearedDate = ({ onClear, modalState, setModalState }) => {
  const [clearedDate, setClearedDate] = useState();
  const toggleModal = () => {
    setClearedDate();
    setModalState((currState) => !currState);
  };

  const [alert, setAlert] = useState({
    color: 'primary',
    message: '',
    visible: false
  });
  const onDismiss = () =>
    setAlert({
      color: 'primary',
      message: '',
      visible: false
    });

  const handleConfirm = () => {
    if (clearedDate) {
      onClear(clearedDate);
      return
    }

    setAlert({
      color: 'danger',
      message: `Clear date required`,
      visible: true
    });
  };

  return (
    <>
      <Button color='info' className='mr-2' onClick={toggleModal}>
        Cleared
      </Button>
      <Modal isOpen={modalState} toggle={toggleModal} size='sm'>
        <ModalHeader toggle={toggleModal}>Clear Disbursement</ModalHeader>
        <ModalBody>
          <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
            {alert.message}
          </Alert>

          <Row className='mb-2'>
            <Col>
              <Label>Cleared Date</Label>
              <Input
                type='date'
                defaultValue={clearedDate}
                onChange={(e) => setClearedDate(e.target.value)}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className='p-4 justify-content-end'>
          <Button color='info' onClick={handleConfirm} className='mr-2'>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ClearedDate;
