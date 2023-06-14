import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from 'reactstrap';

import DisbursementForm from '../components/DisbursementForm';
import { updateDisbursement, getDisbursement } from 'api/disbursement';
import defaultAlert from 'constants/defaultAlert';
import useAlert from 'helper/useAlert';

const Update = ({ id, isOpen, toggle, notify }) => {
  const [alert, setAlert] = useState(defaultAlert);
  const alertFn = useAlert(setAlert);

  const [inputs, setInputs] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [hasEwt, setHasEwt] = useState(false);

  const handleInput = (name, value) => {
    setIsDirty(true);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const toggleModal = () => {
    if (Object.keys(inputs).length !== 0 || isDirty) {
      const response = window.confirm(
        'There have been changes made. Are you sure you want to close the window?'
      );

      if (!response) {
        return;
      }
    }

    setInputs({});
    setIsDirty(false);

    toggle();
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
    if (!inputs.checkDate || inputs.checkDate === '0000-00-00') addMissing('Check Date');

    return missing;
  };

  const handleUpdate = async (status = 1) => {
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

    let result;
    try {
      result = await updateDisbursement(id, data);
    } catch (error) {
      alertFn.danger(`Error encountered while updating Disbursement: ${error}`);
      return;
    }

    if (result.success === false) {
      alertFn.danger(
        `Error encountered while updating Disbursement: ${result.message}`
      );
      return;
    }

    notify(
      'success',
      'Successfully updated disbursement.',
      'tim-icons icon-check-2'
    );
    toggle();
  };

  useEffect(() => {
    const fetchDisbursement = async () => {
      let result;
      try {
        result = await getDisbursement(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error encountered while fetching Disbursement: ${error}`,
          visible: true
        });
        return;
      }

      setInputs(result);
      setHasEwt(!!result.ewtId);
    };
    fetchDisbursement();
  }, [id]);

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
      <ModalHeader toggle={toggleModal}>Update Disbursement</ModalHeader>
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
          isEwtChecked={hasEwt}
        />
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button
          color='primary'
          onClick={() => handleUpdate(0)}
          className='mr-2'>
          Draft
        </Button>
        <Button color='info' onClick={() => handleUpdate(1)} className='mr-2'>
          Update
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Update;
