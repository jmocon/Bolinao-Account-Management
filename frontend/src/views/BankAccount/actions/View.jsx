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

import { getBankAccount } from 'api/bankAccount';

const View = ({ id, isOpen, toggle }) => {
  const [bankAccount, setBankAccount] = useState({});

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

  const fetchBankAccount = useCallback(async () => {
    if (id) {
      const result = await getBankAccount(id);
      setBankAccount(result);
    }
  }, [id]);

  useEffect(() => {
    fetchBankAccount();
  }, [fetchBankAccount]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>View Bank Account</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row>
          <Col>
            <Label>Name</Label>
            <span className='form-control'>{bankAccount.name}</span>
          </Col>
          <Col>
            <Label>Bank</Label>
            <span className='form-control'>{bankAccount.bankName}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Account Number</Label>
            <span className='form-control'>{bankAccount.accountNumber}</span>
          </Col>
          <Col>
            <Label>Account Name</Label>
            <span className='form-control'>{bankAccount.accountName}</span>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
      </ModalFooter>
    </Modal>
  );
};

export default View;
