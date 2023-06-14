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
import { getItemCode, updateItemCode } from 'api/itemCode';
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
        result = await getItemCode(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error while fetching item code: ${error}`,
          visible: true
        });
      }

      setInputs(result);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const CheckContent = () => !inputs.name;

  const handleUpdate = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      alertFn.danger('Complete all required fields');
      return;
    }

    let result;
    try {
      result = await updateItemCode(id, inputs);
    } catch (error) {
      alertFn.danger(`Error occurred while updating item code: ${error}`);
      return;
    }

    if (!result.success) {
      alertFn.danger(
        `Error occurred while updating item code: ${result.message}`
      );
      return;
    }

    notify(
      'success',
      'Successfully updated item code.',
      'tim-icons icon-check-2'
    );

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
      <ModalHeader toggle={toggleModal}>Update Item Code</ModalHeader>
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
              value={inputs.name}
              placeholder='Name'
              invalid={!inputs.name && submitted}
              onChange={(e) => handleInput('name', e.target.value)}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='info' onClick={handleUpdate} className='mr-2'>
          Update
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Update;
