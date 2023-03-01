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

import { getEWT, deleteEWT } from 'api/ewt';

const Delete = ({ ewtId, onChange, isOpen, toggle, toast }) => {
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

  const handleDelete = async () => {
    try {
      await deleteEWT(ewtId);
    } catch (error) {
      setNotif({
        color: 'danger',
        message: error,
        visible: false
      });
      return;
    }
    setNotif({
      color: 'success',
      message: 'Successfully deleted ewt',
      visible: false
    });
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>Delete EWT</ModalHeader>
      <ModalBody>
        <Alert color={notif.color} isOpen={notif.visible} toggle={onDismiss}>
          {notif.message}
        </Alert>
        <Row>
          <Col>
            <h3>Delete the EWT?</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Tax Type</Label>
            <span className='form-control'>{ewt.taxType}</span>
          </Col>
          <Col>
            <Label>Alphanumeric Tax Code</Label>
            <span className='form-control'>{ewt.atc}</span>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='danger' onClick={handleDelete} className='mr-2'>
          Delete
        </Button>
        <Button color='default' onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Delete;
