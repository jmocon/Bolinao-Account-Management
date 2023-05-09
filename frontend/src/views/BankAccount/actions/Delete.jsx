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

import { getBankAccount, deleteBankAccount } from 'api/bankAccount';

const Delete = ({ id, isOpen, toggle, notify }) => {
  const [bankAccount, setBankAccount] = useState({});

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

  const fetchBankAccount = useCallback(async () => {
    if (id) {
      const result = await getBankAccount(id);
      setBankAccount(result);
    }
  }, [id]);

  useEffect(() => {
    fetchBankAccount();
  }, [fetchBankAccount]);

  const handleDelete = async () => {
    try {
      await deleteBankAccount(id);
    } catch (error) {
      setNotif({
        color: 'danger',
        message: error,
        visible: false
      });
      return;
    }

    notify('success', 'Successfully deleted bank account.', 'tim-icons icon-check-2');

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>Delete Bank Account</ModalHeader>
      <ModalBody>
        <Alert color={notif.color} isOpen={notif.visible} toggle={onDismiss}>
          {notif.message}
        </Alert>
        <Row>
          <Col>
            <h3>Delete the Bank Account?</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Name</Label>
            <span className='form-control'>{bankAccount.name}</span>
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
