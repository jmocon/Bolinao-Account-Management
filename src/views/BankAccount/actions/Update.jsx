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
  Input,
  Alert
} from 'reactstrap';

import { getBankAccount, updateBankAccount } from 'api/bankAccount';
import BankDropdown from 'components/Dropdown/BankDropdown';

const Update = ({ id, isOpen, toggle, notify }) => {
  const [name, setName] = useState('');
  const [bankId, setBankId] = useState(0);
  const [accountNumber, setAccountNumber] = useState('');

  const [submitted, setSubmitted] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      let bankAccount = {};
      try {
        bankAccount = await getBankAccount(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error while fetching BankAccount: ${error}`,
          visible: true
        });
      }

      setName(bankAccount.name);
      setBankId(bankAccount.bankId);
      setAccountNumber(bankAccount.accountNumber);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleUpdate = async () => {
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
      name,
      bankId,
      accountNumber
    };

    let result;
    try {
      result = await updateBankAccount(id, data);
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

    notify(
      'success',
      'Successfully updated bank account.',
      'tim-icons icon-check-2'
    );

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>Update Bank Account</ModalHeader>
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
        <Button color='info' onClick={handleUpdate} className='mr-2'>
          Update
        </Button>
        <Button color='default' onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Update;
