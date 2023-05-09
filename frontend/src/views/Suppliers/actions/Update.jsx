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

const Update = ({ id, isOpen, toggle, notify }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [tin, setTin] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [checkPayee, setCheckPayee] = useState('');

  const [submitted, setSubmitted] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      let data = {};
      try {
        data = await getSupplier(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error while fetching Bank: ${error}`,
          visible: true
        });
      }

      setName(data.name);
      setAddress(data.address);
      setTin(data.tin);
      setContactNumber(data.contactNumber);
      setCheckPayee(data.checkPayee);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const CheckContent = () => {
    return !name || !tin || !checkPayee;
  };

  const handleUpdate = async () => {
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
      result = await updateSupplier(id, data);
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

    notify(
      'success',
      'Successfully updated supplier.',
      'tim-icons icon-check-2'
    );

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>Update Supplier</ModalHeader>
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
        <Row>
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
        <Button color='info' onClick={handleUpdate} className='mr-2'>
          Update
        </Button>
        <Button color='default' onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Update;
