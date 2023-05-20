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
import { getBank, updateBank } from 'api/bank';
import defaultAlert from 'constants/defaultAlert';
import useAlert from 'helper/useAlert';
import confirmOnClose from 'helper/confirmOnClose';

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

  useEffect(() => {
    const fetchData = async () => {
      let result = {};
      try {
        result = await getBank(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error while fetching Bank: ${error}`,
          visible: true
        });
      }

      setInputs(result);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const CheckContent = () => !inputs.name || !inputs.abbr;

  const handleUpdate = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      alertFn.danger('Complete all required fields');
      return;
    }

    let result;
    try {
      result = await updateBank(id, inputs);
    } catch (error) {
      alertFn.danger(`Error occurred while updating bank: ${result.message}`);
      return;
    }

    if (!result.success) {
      alertFn.danger(`Error occurred while updating bank: ${result.message}`);
      return;
    }

    notify('success', 'Successfully updated bank.', 'tim-icons icon-check-2');
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
      <ModalHeader toggle={toggleModal}>Update Bank</ModalHeader>
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
              value={inputs.name}
              invalid={!inputs.name && submitted}
              onChange={(e) => handleInput('name', e.target.value)}
            />
          </Col>
          <Col>
            <Label>Abbreviation</Label>
            <Input
              placeholder='Abbreviation'
              value={inputs.abbr}
              invalid={!inputs.abbr && submitted}
              onChange={(e) => handleInput('abbr', e.target.value)}
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
