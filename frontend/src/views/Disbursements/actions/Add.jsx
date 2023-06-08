import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from 'reactstrap';

import { addDisbursement } from 'api/disbursement';
import defaultAlert from 'constants/defaultAlert';
import DisbursementForm from '../components/DisbursementForm';
import useAlert from 'helper/useAlert';

const Add = ({ onChange, notify }) => {
  const [alert, setAlert] = useState(defaultAlert);
  const alertFn = useAlert(setAlert);

  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const toggleAdd = () => {
    setInputs({});
    setIsDirty(false);
    alertFn.dismiss();
    setIsOpen((currState) => !currState);
  };
  const toggleModal = () => {
    if (isDirty) {
      const response = window.confirm(
        'There have been changes made. Are you sure you want to close the window?'
      );

      if (!response) {
        return;
      }
    }
    toggleAdd();
  };

  const CheckContent = () => {
    let missing = '';

    const addMissing = (value) => {
      if (missing) {
        missing = `${missing}, ${value}`;
        return;
      }
      missing = value;
    };

    if (!inputs.bankAccountId) addMissing('Bank Account');
    if (!inputs.checkNumber) addMissing('Check Number');
    if (!inputs.checkDate) addMissing('Check Date');

    return missing;
  };

  const handleInput = (name, value) => {
    setIsDirty(true);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (status = 1) => {
    if (status === 1) {
      const missing = CheckContent();
      if (missing) {
        alertFn.danger(`Complete all required fields: ${missing}`);
        return;
      }
    }

    const data = {
      ...inputs,
      status
    };

    try {
      await addDisbursement(data);
    } catch (error) {
      alertFn.danger(`Error encountered while adding Disbursement: ${error}`);
      return;
    }

    onChange();
    notify(
      'success',
      'Successfully added disbursement.',
      'tim-icons icon-check-2'
    );
    toggleAdd();
  };

  return (
    <>
      <Button
        color='info'
        size='sm'
        title='View'
        onClick={toggleModal}
        className='animation-on-hover'>
        <i className='fa fa-plus'></i> New Check Disbursement
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
        <ModalHeader toggle={toggleModal}>New Check Disbursement</ModalHeader>
        <ModalBody>
          <Alert
            color={alert.color}
            isOpen={alert.visible}
            toggle={alertFn.dismiss}>
            {alert.message}
          </Alert>
          <DisbursementForm
            handleInput={handleInput}
            inputs={inputs}
            setAlert={setAlert}
          />
        </ModalBody>
        <ModalFooter className='p-4 justify-content-end'>
          <Button color='primary' onClick={() => handleAdd(0)} className='mr-2'>
            Draft
          </Button>
          <Button color='info' onClick={() => handleAdd(1)} className='mr-2'>
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
