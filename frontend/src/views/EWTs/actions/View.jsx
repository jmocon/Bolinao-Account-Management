import React, { useState, useEffect, useCallback } from 'react';
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

import { getEWT } from 'api/ewt';

const View = ({ ewtId, isOpen, toggle, toast }) => {
  const [ewt, setEWT] = useState({});

  // Notification
  const [notif, setNotif] = useState({
    color: 'primary',
    message: '',
    visible: false
  });
  const onDismiss = () =>
    setNotif({
      color: 'primary',
      message: '',
      visible: false
    });

  const fetchEWT = useCallback(async () => {
    if (ewtId) {
      const result = await getEWT(ewtId);
      setEWT(result);
    }
  }, [ewtId]);

  useEffect(() => {
    fetchEWT();
  }, [fetchEWT]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>View EWT</ModalHeader>
      <ModalBody>
        <Alert color={notif.color} isOpen={notif.visible} toggle={onDismiss}>
          {notif.message}
        </Alert>
        <Row>
          <Col lg='4'>
            <Label>Tax Type</Label>
            <span className='form-control'>{ewt.taxType}</span>
          </Col>
          <Col lg='4'>
            <Label>Tax Rate</Label>
            <span className='form-control'>{ewt.taxRate} %</span>
          </Col>{' '}
          <Col lg='4'>
            <Label>Alphanumeric Tax Code</Label>
            <span className='form-control'>{ewt.atc}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Description</Label>
            <span className='form-control'>{ewt.description}</span>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
      </ModalFooter>
    </Modal>
  );
};

export default View;
