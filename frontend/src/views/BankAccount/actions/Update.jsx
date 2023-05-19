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
import confirmOnClose from 'helper/confirmOnClose';
import useAlert from 'helper/useAlert';
import defaultAlert from 'constants/defaultAlert';

const Update = ({ id, isOpen, toggle, notify }) => {
  const [alert, setAlert] = useState(defaultAlert);
  const alertFn = useAlert(setAlert);

  const [submitted, setSubmitted] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [inputs, setInputs] = useState({});
  const handleInput = (name, value) => {
    setIsDirty(true);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const toggleModal = () => {
    if (!confirmOnClose(isDirty)) {
      return;
    }

    setInputs({});
    setIsDirty(false);
    toggle();
  };

  const CheckContent = () =>
    !inputs.name ||
    !inputs.bankId ||
    !inputs.accountNumber ||
    !inputs.accountName;

  useEffect(() => {
    const fetchData = async () => {
      let result = {};
      try {
        result = await getBankAccount(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error while fetching Bank account: ${error}`,
          visible: true
        });
      }

      setInputs(result);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleUpdate = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      alertFn.danger('Complete all required fields');
      return;
    }

    let result;
    try {
      result = await updateBankAccount(id, inputs);
    } catch (error) {
      alertFn.danger(`Error occurred while updating bank account: ${error}`);
      return;
    }

    if (!result.success) {
      alertFn.danger(
        `Error occurred while updating bank account: ${result.message}`
      );
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
    <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
      <ModalHeader toggle={toggleModal}>Update Bank Account</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={alertFn.dismiss}>
          {alert.message}
        </Alert>
        <Row>
            <Col>
              <Label>Name</Label>
              <Input
                placeholder='Name'
                value={inputs.name}
                invalid={!inputs.name && submitted}
                onChange={(e) => handleInput('name', e.target.value)}
              />
            </Col>
            <Col>
              <Label>Bank</Label>
              <BankDropdown
                label='Bank'
                value={inputs.bankId}
                onChange={(e) => handleInput('bankId', e)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Account Number</Label>
              <Input
                placeholder='Account Number'
                value={inputs.accountNumber}
                invalid={!inputs.accountNumber && submitted}
                onChange={(e) => handleInput('accountNumber', e.target.value)}
              />
            </Col>
            <Col>
              <Label>Account Name</Label>
              <Input
                placeholder='Account Name'
                value={inputs.accountName}
                invalid={!inputs.accountName && submitted}
                onChange={(e) => handleInput('accountName', e.target.value)}
              />
            </Col>
          </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='info' onClick={handleUpdate} className='mr-2'>
          Update
        </Button>
        <Button color='default' onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Update;
