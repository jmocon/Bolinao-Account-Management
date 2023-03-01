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

import { addBankAccount } from 'api/bankAccount';
import BankDropdown from 'components/Dropdown/BankDropdown';

const Add = ({ onChange = () => {}, notify = () => {} }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setName('');
    onDismiss();
    setSubmitted(false);
    setIsOpen((currState) => !currState);
  };

  const [name, setName] = useState();
  const [bankId, setBankId] = useState();
  const [accountNumber, setAccountNumber] = useState();

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
    return !name || !bankId || !accountNumber;
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

    const data = { name, bankId, accountNumber };

    let result;
    try {
      result = await addBankAccount(data);
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
    notify(
      'success',
      'Successfully added bank account.',
      'tim-icons icon-check-2'
    );
    toggleModal();
  };

  return (
    <>
      <Button
        color='info'
        size='sm'
        title='Add'
        onClick={toggleModal}
        className='animation-on-hover'>
        <i className='fa fa-plus'></i> New Bank Account
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
        <ModalHeader toggle={toggleModal}>Add Bank Account</ModalHeader>
        <ModalBody>
          <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
            {alert.message}
          </Alert>
          <Row>
            <Col>
              <Label>Name</Label>
              <Input
                value={name}
                placeholder='Name'
                invalid={!name && submitted}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col>
              <Label>Bank</Label>
              <BankDropdown label='Bank' onChange={setBankId} value={bankId} />
            </Col>
            <Col>
              <Label>Account Number</Label>
              <Input
                value={accountNumber}
                placeholder='Account Number'
                invalid={!accountNumber && submitted}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </Col>
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
