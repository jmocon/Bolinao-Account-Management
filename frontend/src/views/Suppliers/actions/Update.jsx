import React, { useState, useEffect } from 'react';
// import axios from '../../../Axios';
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

import { getSupplier, updateSupplier } from 'api/supplier';
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
      let data = {};
      try {
        data = await getSupplier(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error while fetching Supplier: ${error}`,
          visible: true
        });
      }

      setInputs(data);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const CheckContent = () => !inputs.name || !inputs.tin || !inputs.checkPayee;

  const handleUpdate = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      alertFn.danger('Complete all required fields');
      return;
    }

    let result;
    try {
      result = await updateSupplier(id, inputs);
    } catch (error) {
      alertFn.danger(`Error occurred while updating supplier: ${error}`);
      return;
    }

    if (!result.success) {
      alertFn.danger(
        `Error occurred while updating supplier: ${result.message}`
      );
      return;
    }

    notify(
      'success',
      'Successfully updated supplier.',
      'tim-icons icon-check-2'
    );
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
      <ModalHeader toggle={toggleModal}>Update Supplier</ModalHeader>
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
        <Button color='info' onClick={handleUpdate} className='mr-2'>
          Update
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Update;
