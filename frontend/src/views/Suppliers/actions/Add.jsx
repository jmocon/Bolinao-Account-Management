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

import { addSupplier } from 'api/supplier';
import defaultAlert from 'constants/defaultAlert';
import useAlert from 'helper/useAlert';
import confirmOnClose from 'helper/confirmOnClose';

const Add = ({ onChange = () => {}, notify = () => {} }) => {
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
    if (!confirmOnClose(isDirty)) {
      return;
    }
    cleanAndToggle();
  };

  const CheckContent = () => !inputs.name || !inputs.tin || !inputs.checkPayee;

  const handleAdd = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      alertFn.danger('Complete all required fields');
      return;
    }

    let result;
    try {
      result = await addSupplier(inputs);
    } catch (error) {
      alertFn.danger(`Error occurred while adding supplier: ${error}`);
      return;
    }

    if (!result.success) {
      alertFn.danger(`Error occurred while adding supplier: ${result.message}`);
      return;
    }

    onChange();
    notify('success', 'Successfully added supplier.', 'tim-icons icon-check-2');
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
        <i className='fa fa-plus'></i> New Supplier
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
        <ModalHeader toggle={toggleModal}>Add Supplier</ModalHeader>
        <ModalBody>
          <Alert
            color={alert.color}
            isOpen={alert.visible}
            toggle={alertFn.dismiss}>
            {alert.message}
          </Alert>
          <Row className='mb-2'>
            <Col md='4'>
              <Label>Name</Label>
              <Input
                value={inputs.name}
                placeholder='Name'
                invalid={!inputs.name && submitted}
                onChange={(e) => handleInput('name', e.target.value)}
              />
            </Col>
            <Col md='4'>
              <Label>TIN</Label>
              <Input
                value={inputs.tin}
                placeholder='TIN'
                invalid={!inputs.tin && submitted}
                onChange={(e) => handleInput('tin', e.target.value)}
              />
            </Col>
            <Col md='4'>
              <Label>Contact Number</Label>
              <Input
                value={inputs.contactNumber}
                placeholder='(+639) 12345 6789'
                onChange={(e) => handleInput('contactNumber', e.target.value)}
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>
              <Label>Address</Label>
              <Input
                className='pl-2'
                type='textarea'
                value={inputs.address}
                placeholder='Address'
                onChange={(e) => handleInput('address', e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Bank Details</Label>
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col md='4'>
              <Label>Check Payee</Label>
              <Input
                value={inputs.checkPayee}
                placeholder='Check Payee'
                invalid={!inputs.checkPayee && submitted}
                onChange={(e) => handleInput('checkPayee', e.target.value)}
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
