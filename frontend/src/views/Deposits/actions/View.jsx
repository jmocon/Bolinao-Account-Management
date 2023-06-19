import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Alert
} from 'reactstrap';

import { clearDeposit, getDeposit } from 'api/deposit';
import { getBankAccount } from 'api/bankAccount';
import modeOfPayments, { modeOfPaymentValues } from 'constants/modeOfPayments';
import { getBank } from 'api/bank';
import ClearedDate from '../components/ClearedDate';

const View = ({ id, isOpen, toggle, notify }) => {
  const [deposit, setDeposit] = useState({});
  const [bankAccount, setBankAccount] = useState({});
  const [bank, setBank] = useState({});
  const [clearDateModal, setClearDateModal] = useState(false);

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

  const handleClearedDate = async (clearedDate) => {
    let response;
    try {
      response = await clearDeposit(id, { clearedDate });
    } catch (error) {
      setAlert({
        color: 'danger',
        message: `Error encountered while clearing deposit: ${error}`,
        visible: true
      });
      return;
    }

    if (!response.success) {
      setAlert({
        color: 'danger',
        message: `Error encountered while setting cleared date: ${response.message}`,
        visible: true
      });
    }

    notify(
      'success',
      'Successfully cleared deposit.',
      'tim-icons icon-check-2'
    );
    setClearDateModal(false);
    toggle();
  };

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
          <Col md={3}>
            <Label>Mode of Payment</Label>
            <span className='form-control'>
              {modeOfPayments[deposit.modeOfPayment]}
            </span>
          </Col>
          {[modeOfPaymentValues.Check, modeOfPaymentValues.Online].includes(
            deposit.modeOfPayment
          ) && (
            <Col md={3}>
              <Label>Bank</Label>
              <span className='form-control'>{bank.abbr}</span>
            </Col>
          )}
          {deposit.modeOfPayment === modeOfPaymentValues.Check && (
            <>
              <Col md={3}>
                <Label>Check Number</Label>
                <span className='form-control'>{deposit.checkNumber}</span>
              </Col>
              <Col md={3}>
                <Label>Check Date</Label>
                <span className='form-control'>{deposit.checkDate}</span>
              </Col>
            </>
          )}
        </Row>
        {deposit.clearedDate && (
          <Row className='mb-2'>
            <Col md={4}>
              <Label>Cleared Date</Label>
              <span className='form-control'>{deposit.clearedDate}</span>
            </Col>
          </Row>
        )}
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        {!deposit.clearedDate && (
          <ClearedDate
            onClear={handleClearedDate}
            modalState={clearDateModal}
            setModalState={setClearDateModal}
          />
        )}
      </ModalFooter>
    </Modal>
  );
};

export default View;
