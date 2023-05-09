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

import { getDeposit, deleteDeposit } from 'api/deposit';

const Delete = ({ id, isOpen, toggle, notify }) => {
  const [deposit, setDeposit] = useState({});

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
    const fetchDeposit = async () => {
      if (id) {
        const result = await getDeposit(id);
        setDeposit(result);
      }
    };
    fetchDeposit();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteDeposit(id);
    } catch (error) {
      setAlert({
        color: 'danger',
        message: error,
        visible: false
      });
      return;
    }

    notify('success', 'Successfully deleted deposit.', 'tim-icons icon-check-2');

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>Delete Deposit</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row>
          <Col>
            <h3>Delete the Deposit?</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Deposit Id</Label>
            <span className='form-control'>{`D${String(deposit.depositId).padStart(5,'0')}`}</span>
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
