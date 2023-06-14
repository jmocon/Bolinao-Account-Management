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

import { deleteDepositSlip, getDepositSlip } from 'api/depositSlip';

const Delete = ({ id, isOpen, toggle, notify }) => {
  const [ds, setDs] = useState({});

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
        const result = await getDepositSlip(id);
        setDs(result.depositSlip);
      }
    };
    fetchDeposit();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteDepositSlip(id);
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
      <ModalHeader toggle={toggle}>Delete Deposit Slip</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row>
          <Col>
            <h3>Delete the Deposit Slip?</h3>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Label>Deposit Slip Id</Label>
            <span className='form-control'>{ds.depositSlipCode}</span>
          </Col>
          <Col md={4}>
            <Label>Date Created</Label>
            <span className='form-control'>{ds.dateCreated}</span>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='danger' onClick={handleDelete} className='mr-2'>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Delete;
