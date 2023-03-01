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

const Add = ({ onChange = () => {}, notify = () => {} }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setName('');
    setAddress('');
    setTin('');
    setContactNumber('');
    setCheckPayee('');
    onDismiss();
    setSubmitted(false);
    setIsOpen((currState) => !currState);
  };

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [tin, setTin] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [checkPayee, setCheckPayee] = useState('');

  // Notification
  const [alert, setAlert] = useState({
    color: 'primary',
    message: '',
    visible: false
  });

  const onDismiss = () =>
    setAlert({
      color: 'primary',
      message: '',
      visible: false
    });

  const CheckContent = () => {
    return !name || !tin || !checkPayee;
  };

  const handleAdd = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      setAlert({
        color: 'danger',
        message: 'Complete all required fields',
        visible: true
      });
      return;
    }

    const data = {
      name,
      address,
      tin,
      contactNumber,
      checkPayee
    };

    let result;
    try {
      result = await addSupplier(data);
    } catch (error) {
      setAlert({
        color: 'danger',
        message: error,
        visible: true
      });
      return;
    }

    if (!result.success) {
      setAlert({
        color: 'danger',
        message: result.message,
        visible: true
      });
      return;
    }

    onChange();
    notify('success', 'Successfully added bank.', 'tim-icons icon-check-2');
    toggleModal();
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
          <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
            {alert.message}
          </Alert>
          <Row className='mb-2'>
            <Col md='4'>
              <Label>Name</Label>
              <Input
                value={name}
                placeholder='Name'
                invalid={!name && submitted}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col md='4'>
              <Label>TIN</Label>
              <Input
                defaultValue={tin}
                placeholder='TIN'
                invalid={!tin && submitted}
                onChange={(e) => setTin(e.target.value)}
              />
            </Col>
            <Col md='4'>
              <Label>Contact Number</Label>
              <Input
                defaultValue={contactNumber}
                placeholder='(+639) 12345 6789'
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>
              <Label>Address</Label>
              <Input
                className='pl-2'
                type='textarea'
                defaultValue={address}
                placeholder='Address'
                onChange={(e) => setAddress(e.target.value)}
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
                value={checkPayee}
                placeholder='Check Payee'
                invalid={!checkPayee && submitted}
                onChange={(e) => setCheckPayee(e.target.value)}
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
