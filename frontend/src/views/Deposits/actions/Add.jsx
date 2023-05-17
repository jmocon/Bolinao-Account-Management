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

import BankDropdown from 'components/Dropdown/BankDropdown';
import BankAccountDropdown from 'components/Dropdown/BankAccountDropdown';
import ModeOfPaymentDropdown from 'components/Dropdown/Disbursement/ModeOfPaymentDropdown';

import confirmOnClose from 'helper/confirmOnClose';
import defaultAlert from 'constants/defaultAlert';
import { modeOfPaymentValues } from 'constants/modeOfPayments';

import { addDeposit } from 'api/deposit';
import useAlert from 'helper/useAlert';

const Add = ({ onChange, notify }) => {
  const [alert, setAlert] = useState(defaultAlert);
  const alertFn = useAlert(setAlert);

  const [inputs, setInputs] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const handleInput = (name, value) => {
    setIsDirty(true);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const cleanAndClose = () => {
    setIsOpen((currState) => !currState);
    setInputs({});
    setIsDirty(false);
    setSubmitted(false);
    alertFn.dismiss();
  };
  const toggleModal = () => {
    if (!confirmOnClose(isDirty)) {
      return;
    }
    cleanAndClose();
  };

  const CheckContent = () => {
    switch (inputs.modeOfPayment) {
      case modeOfPaymentValues.Cash:
        break;
      case modeOfPaymentValues.Check:
        if (!inputs.bankId || !inputs.checkNumber || !inputs.checkDate)
          return true;
        break;
      case modeOfPaymentValues.Online:
        if (!inputs.bankId) return true;
        break;

      default:
        return true;
    }

    return (
      !inputs.bankAccountId ||
      !inputs.payee ||
      !inputs.particular ||
      !inputs.depositDate ||
      !inputs.amount
    );
  };

  const handleAdd = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      alertFn.danger('Complete all required fields');
      return;
    }

    let result;
    try {
      result = await addDeposit(inputs);
    } catch (error) {
      alertFn.danger(error);
      return;
    }

    if (!result.success) {
      alertFn.danger(result.message);
      return;
    }

    onChange();
    notify('success', 'Successfully added deposit.', 'tim-icons icon-check-2');
    cleanAndClose();
  };

  const handleModeOfPayment = (mop) => {
    handleInput('modeOfPayment', mop);

    switch (mop) {
      case modeOfPaymentValues.Cash:
        handleInput('bankId', '');
        handleInput('checkNumber', '');
        handleInput('checkDate', '');
        break;
      case modeOfPaymentValues.Online:
        handleInput('checkNumber', '');
        handleInput('checkDate', '');
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
          <Alert
            color={alert.color}
            isOpen={alert.visible}
            toggle={alertFn.dismiss}>
            {alert.message}
          </Alert>
          <Row className='mb-2'>
            <Col>
              <Label>Bank Account</Label>
              <BankAccountDropdown
                value={inputs.bankAccountId}
                onChange={(e) => handleInput('bankAccountId', e)}
              />
            </Col>
            <Col>
              <Label>Payee</Label>
              <Input
                value={inputs.payee}
                placeholder='Payee'
                invalid={!inputs.payee && submitted}
                onChange={(e) => handleInput('payee', e.target.value)}
              />
            </Col>
            <Col>
              <Label>Deposit Date</Label>
              <Input
                type='date'
                value={inputs.depositDate}
                placeholder='Deposit Date'
                invalid={!inputs.depositDate && submitted}
                onChange={(e) => handleInput('depositDate', e.target.value)}
              />
            </Col>
            <Col>
              <Label>Amount</Label>
              <Input
                type='number'
                value={inputs.amount}
                placeholder='Amount'
                invalid={!inputs.amount && submitted}
                onChange={(e) => handleInput('amount', e.target.value)}
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>
              <Label>Particular</Label>
              <Input
                type='textarea'
                value={inputs.particular}
                placeholder='Particular'
                invalid={!inputs.particular && submitted}
                onChange={(e) => handleInput('particular', e.target.value)}
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col md={3}>
              <Label>Mode of Payment</Label>
              <ModeOfPaymentDropdown
                value={inputs.modeOfPayment}
                onChange={handleModeOfPayment}
              />
            </Col>

            {[modeOfPaymentValues.Check, modeOfPaymentValues.Online].includes(
              inputs.modeOfPayment
            ) && (
              <Col md={3}>
                <Label>Bank</Label>
                <BankDropdown
                  value={inputs.bankId}
                  onChange={(e) => handleInput('bankId', e)}
                />
              </Col>
            )}

            {modeOfPaymentValues.Check === inputs.modeOfPayment && (
              <>
                <Col md={3}>
                  <Label>Check Number</Label>
                  <Input
                    placeholder='Check Number'
                    value={inputs.checkNumber}
                    invalid={!inputs.checkNumber && submitted}
                    onChange={(e) => handleInput('checkNumber', e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Label>Check Date</Label>
                  <Input
                    type='date'
                    placeholder='Check Date'
                    value={inputs.checkDate}
                    invalid={!inputs.checkDate && submitted}
                    onChange={(e) => handleInput('checkDate', e.target.value)}
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
