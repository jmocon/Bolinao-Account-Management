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

import { getDeposit } from 'api/deposit';
import { getBankAccount } from 'api/bankAccount';
import modeOfPayments from 'constants/modeOfPayments';
import { getBank } from 'api/bank';

const View = ({ id, isOpen, toggle }) => {
  const [deposit, setDeposit] = useState({});
  const [bankAccount, setBankAccount] = useState({});
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
      const fetchDeposit = async () => {
        if (id) {
          const result = await getDeposit(id);
          setDeposit(result);
        }
      };
      fetchDeposit();
    }, [id]);

    useEffect(() => {
      const fetchData = async () => {
        if (deposit.bankAccountId) {
          const result = await getBankAccount(deposit.bankAccountId);
          setBankAccount(result);
        }
      };
      fetchData();
    }, [deposit]);

    useEffect(() => {
      const fetchData = async () => {
        if (deposit.bankId) {
          const result = await getBank(deposit.bankId);
          setBank(result);
        }
      };
      fetchData();
    }, [deposit]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>View Deposit</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row className='mb-2'>
          <Col md={4}>
            <Label>Bank Account</Label>
            <span className='form-control'>{bankAccount.name}</span>
          </Col>
          <Col md={4}>
            <Label>Payee</Label>
            <span className='form-control'>{deposit.payee}</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col>
            <Label>Particular</Label>
            <span className='form-control'>{deposit.particular}</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col md={4}>
            <Label>Deposit Date</Label>
            <span className='form-control'>{deposit.depositDate}</span>
          </Col>
          <Col md={4}>
            <Label>Amount</Label>
            <span className='form-control'>{deposit.amount}</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col md={4}>
            <Label>Mode of Payment</Label>
            <span className='form-control'>{modeOfPayments[ deposit.modeOfPayment]}</span>
          </Col>
          {deposit.modeOfPayment === 0 && (
            <>
              <Col md={4}>
                <Label>Bank</Label>
                <span className='form-control'>{bank.abbr}</span>
              </Col>
              <Col md={4}>
                <Label>Check Number</Label>
                <span className='form-control'>{deposit.checkNumber}</span>
              </Col>
            </>
          )}
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='default' onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default View;
