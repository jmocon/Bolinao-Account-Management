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

import { addDeposit } from 'api/deposit';
import BankAccountDropdown from 'components/Dropdown/BankAccountDropdown';
import BankDropdown from 'components/Dropdown/BankDropdown';
import ModeOfPaymentDropdown from 'components/Dropdown/Disbursement/ModeOfPaymentDropdown';
import { modeOfPaymentValues } from 'constants/modeOfPayments';

const Add = ({ onChange = () => {}, notify = () => {} }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setBankAccountId('');
    setPayee('');
    setParticular('');
    setDepositDate('');
    setBankId('');
    setModeOfPayment('');
    setAmount('');
    setCheckNumber('');
    setCheckDate('');
    onDismiss();
    setSubmitted(false);
    setIsOpen((currState) => !currState);
  };

  const [bankAccountId, setBankAccountId] = useState();
  const [payee, setPayee] = useState();
  const [particular, setParticular] = useState();
  const [depositDate, setDepositDate] = useState();
  const [amount, setAmount] = useState();
  const [modeOfPayment, setModeOfPayment] = useState();
  const [bankId, setBankId] = useState();
  const [checkNumber, setCheckNumber] = useState();
  const [checkDate, setCheckDate] = useState();

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

  const CheckContent = () => {
    switch (modeOfPayment) {
      case modeOfPaymentValues.Cash:
        break;
      case modeOfPaymentValues.Check:
        if (!bankId || !checkNumber || !checkDate) return true;
        break;
      case modeOfPaymentValues.Online:
        if (!bankId) return true;
        break;

      default:
        break;
    }

    return !bankAccountId || !payee || !particular || !depositDate || !amount;
  };

  const handleAdd = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      setAlert({
        color: 'danger',
        message: 'Complete all required fields',
        visible: true
      });
      return;
    }

    const data = {
      bankAccountId,
      payee,
      particular,
      depositDate,
      amount,
      modeOfPayment,
      bankId,
      checkNumber,
      checkDate
    };

    let result;
    try {
      result = await addDeposit(data);
    } catch (error) {
      setAlert({
        color: 'danger',
        message: error,
        visible: true
      });
      return;
    }

    if (!result.success) {
      setAlert({
        color: 'danger',
        message: result.message,
        visible: true
      });
      return;
    }

    onChange();
    notify('success', 'Successfully added deposit.', 'tim-icons icon-check-2');
    toggleModal();
  };

  const handleModeOfPayment = (mop) => {
    setModeOfPayment(mop);

    switch (mop) {
      case modeOfPaymentValues.Cash:
        setBankId('');
        setCheckNumber('');
        setCheckDate('');
        break;
      case modeOfPaymentValues.Online:
        setCheckNumber('');
        setCheckDate('');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Button
        color='info'
        size='sm'
        title='Add'
        onClick={toggleModal}
        className='animation-on-hover'>
        <i className='fa fa-plus'></i> New Deposit
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
        <ModalHeader toggle={toggleModal}>Add Deposit</ModalHeader>
        <ModalBody>
          <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
            {alert.message}
          </Alert>
          <Row className='mb-2'>
            <Col>
              <Label>Bank Account</Label>
              <BankAccountDropdown
                value={bankAccountId}
                onChange={(e) => {
                  setBankAccountId(e);
                }}
              />
            </Col>
            <Col>
              <Label>Payee</Label>
              <Input
                value={payee}
                placeholder='Payee'
                invalid={!payee && submitted}
                onChange={(e) => setPayee(e.target.value)}
              />
            </Col>
            <Col>
              <Label>Deposit Date</Label>
              <Input
                type='date'
                value={depositDate}
                placeholder='Deposit Date'
                invalid={!depositDate && submitted}
                onChange={(e) => setDepositDate(e.target.value)}
              />
            </Col>
            <Col>
              <Label>Amount</Label>
              <Input
                type='number'
                value={amount}
                placeholder='Amount'
                invalid={!amount && submitted}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>
              <Label>Particular</Label>
              <Input
                type='textarea'
                value={particular}
                placeholder='Particular'
                invalid={!particular && submitted}
                onChange={(e) => setParticular(e.target.value)}
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col md={3}>
              <Label>Mode of Payment</Label>
              <ModeOfPaymentDropdown
                value={modeOfPayment}
                onChange={handleModeOfPayment}
              />
            </Col>

            {[modeOfPaymentValues.Check, modeOfPaymentValues.Online].includes(
              modeOfPayment
            ) && (
              <Col md={3}>
                <Label>Bank</Label>
                <BankDropdown value={bankId} onChange={setBankId} />
              </Col>
            )}

            {modeOfPaymentValues.Check === modeOfPayment && (
              <>
                <Col md={3}>
                  <Label>Check Number</Label>
                  <Input
                    value={checkNumber}
                    placeholder='Check Number'
                    invalid={!checkNumber && submitted}
                    onChange={(e) => setCheckNumber(e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Label>Check Date</Label>
                  <Input
                    type='date'
                    value={checkDate}
                    placeholder='Check Date'
                    invalid={!checkDate && submitted}
                    onChange={(e) => setCheckDate(e.target.value)}
                  />
                </Col>
              </>
            )}
          </Row>
        </ModalBody>
        <ModalFooter className='p-4 justify-content-end'>
          <Button color='info' onClick={handleAdd} className='mr-2'>
            Add
          </Button>
          <Button color='default' onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Add;
