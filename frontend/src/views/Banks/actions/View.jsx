import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Alert
} from 'reactstrap';

import { getBank } from 'api/bank';

const View = ({ id, isOpen, toggle }) => {
  const [bank, setBank] = useState({});

  // Notification
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

  useEffect(() => {
    const fetchBank = async () => {
      if (id) {
        const result = await getBank(id);
        setBank(result);
      }
    };
    fetchBank();
  }, [id]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>View Bank</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row>
          <Col>
            <Label>Name</Label>
            <span className='form-control'>{bank.name}</span>
          </Col>
          <Col>
            <Label>Abbreviation</Label>
            <span className='form-control'>{bank.abbr}</span>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
      </ModalFooter>
    </Modal>
  );
};

export default View;
