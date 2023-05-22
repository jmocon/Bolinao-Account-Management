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
import confirmOnClose from 'helper/confirmOnClose';
import useAlert from 'helper/useAlert';
import defaultAlert from 'constants/defaultAlert';

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
  const cleanAndToggle = () => {
    setIsOpen((currState) => !currState);
    setInputs({});
    setIsDirty(false);
    setSubmitted(false);
    alertFn.dismiss();
  };
  const toggleModal = () => {
    if (!confirmOnClose(isDirty)) return;
    cleanAndToggle();
  };

  const CheckContent = () =>
    !inputs.name ||
    !inputs.bankId ||
    !inputs.accountNumber ||
    !inputs.accountName;

  const handleAdd = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      alertFn.danger('Complete all required fields');
      return;
    }

    let result;
    try {
      result = await addBankAccount(inputs);
    } catch (error) {
      alertFn.danger(
        `Error occurred while adding bank account: ${result.message}`
      );
      return;
    }

    if (!result.success) {
      alertFn.danger(`Error occurred while adding user: ${result.message}`);
      return;
    }

    onChange();
    notify(
      'success',
      'Successfully added bank account.',
      'tim-icons icon-check-2'
    );
    cleanAndToggle();
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
          <Alert
            color={alert.color}
            isOpen={alert.visible}
            toggle={alertFn.dismiss}>
            {alert.message}
          </Alert>
          <Row>
            <Col>
              <Label>Name</Label>
              <Input
                placeholder='Name'
                value={inputs.name ?? ''}
                invalid={!inputs.name && submitted}
                onChange={(e) => handleInput('name', e.target.value)}
              />
            </Col>
            <Col>
              <Label>Bank</Label>
              <BankDropdown
                label='Bank'
                value={inputs.bankId ?? ''}
                onChange={(e) => handleInput('bankId', e)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Account Number</Label>
              <Input
                placeholder='Account Number'
                value={inputs.accountNumber ?? ''}
                invalid={!inputs.accountNumber && submitted}
                onChange={(e) => handleInput('accountNumber', e.target.value)}
              />
            </Col>
            <Col>
              <Label>Account Name</Label>
              <Input
                placeholder='Account Name'
                value={inputs.accountName ?? ''}
                invalid={!inputs.accountName && submitted}
                onChange={(e) => handleInput('accountName', e.target.value)}
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
