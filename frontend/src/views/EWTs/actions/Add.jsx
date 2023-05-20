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

import { addEWT } from 'api/ewt';
import defaultAlert from 'constants/defaultAlert';
import useAlert from 'helper/useAlert';
import confirmOnClose from 'helper/confirmOnClose';

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
    !inputs.taxType || !inputs.description || !inputs.taxRate || !inputs.atc;

  const handleAdd = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      alertFn.danger('Complete all required fields');
      return;
    }

    let result;
    try {
      result = await addEWT(inputs);
    } catch (error) {
      alertFn.danger(`Error occurred while adding ewt: ${result.message}`);
      return;
    }

    if (!result.success) {
      alertFn.danger(`Error occurred while adding ewt: ${result.message}`);
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
        title='View'
        onClick={toggleModal}
        className='animation-on-hover'>
        <i className='fa fa-plus'></i> New EWT
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
        <ModalHeader toggle={toggleModal}>Add EWT</ModalHeader>
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
                value={inputs.taxType}
                invalid={!inputs.taxType && submitted}
                onChange={(e) => handleInput('taxType', e.target.value)}
              />
            </Col>
            <Col lg='4'>
              <Label>Tax Rate (%)</Label>
              <Input
                type='number'
                placeholder='Tax Rate'
                value={inputs.taxRate}
                invalid={!inputs.taxRate && submitted}
                onChange={(e) => handleInput('taxRate', e.target.value)}
              />
            </Col>
            <Col lg='4'>
              <Label>Alphanumeric Tax Code</Label>
              <Input
                placeholder='Alphanumeric Tax Code'
                value={inputs.atc}
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
                value={inputs.description}
                invalid={!inputs.description && submitted}
                onChange={(e) => handleInput('description', e.target.value)}
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
