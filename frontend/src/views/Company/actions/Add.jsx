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

import { addCompany } from 'api/company';
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

  const CheckContent = () => !inputs.code || !inputs.name || !inputs.tin;

  const handleAdd = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      alertFn.danger('Complete all required fields');
      return;
    }

    let result;
    try {
      result = await addCompany(inputs);
    } catch (error) {
      alertFn.danger(`Error occurred while adding company: ${result.message}`);
      return;
    }

    if (!result.success) {
      alertFn.danger(`Error occurred while adding company: ${result.message}`);
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
        <i className='fa fa-plus'></i> New Company
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
        <ModalHeader toggle={toggleModal}>Add Company</ModalHeader>
        <ModalBody>
          <Alert
            color={alert.color}
            isOpen={alert.visible}
            toggle={alertFn.dismiss}>
            {alert.message}
          </Alert>
          <Row>
            <Col>
              <Label>Code</Label>
              <Input
                placeholder='Code'
                value={inputs.code}
                invalid={!inputs.code && submitted}
                onChange={(e) => handleInput('code', e.target.value)}
              />
            </Col>
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
              <Label>TIN</Label>
              <Input
                placeholder='TIN'
                value={inputs.tin}
                invalid={!inputs.tin && submitted}
                onChange={(e) => handleInput('tin', e.target.value)}
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>
              <Label>Address</Label>
              <Input
                type='textarea'
                placeholder='Address'
                value={inputs.address}
                invalid={!inputs.address && submitted}
                onChange={(e) => handleInput('address', e.target.value)}
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
