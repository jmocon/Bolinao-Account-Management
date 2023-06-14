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

import { getEWT, updateEWT } from 'api/ewt';
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
        result = await getEWT(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error while fetching EWT: ${error}`,
          visible: true
        });
      }

      setInputs(result);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const CheckContent = () =>
    !inputs.taxType || !inputs.description || !inputs.taxRate || !inputs.atc;

  const handleUpdate = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      alertFn.danger('Complete all required fields');
      return;
    }

    let result;
    try {
      result = await updateEWT(id, inputs);
    } catch (error) {
      alertFn.danger(`Error occurred while updating EWT: ${error}`);
      return;
    }

    if (!result.success) {
      alertFn.danger(`Error occurred while updating EWT: ${result.message}`);
      return;
    }

    notify('success', 'Successfully updated EWT.', 'tim-icons icon-check-2');
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
      <ModalHeader toggle={toggleModal}>Update EWT</ModalHeader>
      <ModalBody>
        <Alert
          color={alert.color}
          isOpen={alert.visible}
          toggle={alertFn.dismiss}>
          {alert.message}
        </Alert>
        <Row>
          <Col lg='4'>
            <Label>Tax Type</Label>
            <Input
              placeholder='Tax Type'
              value={inputs.taxType ?? ''}
              invalid={!inputs.taxType && submitted}
              onChange={(e) => handleInput('taxType', e.target.value)}
            />
          </Col>
          <Col lg='4'>
            <Label>Tax Rate (%)</Label>
            <Input
              type='number'
              placeholder='Tax Rate'
              value={inputs.taxRate ?? ''}
              invalid={!inputs.taxRate && submitted}
              onChange={(e) => handleInput('taxRate', e.target.value)}
            />
          </Col>
          <Col lg='4'>
            <Label>Alphanumeric Tax Code</Label>
            <Input
              placeholder='Alphanumeric Tax Code'
              value={inputs.atc ?? ''}
              invalid={!inputs.atc && submitted}
              onChange={(e) => handleInput('atc', e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Description</Label>
            <Input
              type='textarea'
              placeholder='Description'
              value={inputs.description ?? ''}
              invalid={!inputs.description && submitted}
              onChange={(e) => handleInput('description', e.target.value)}
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
