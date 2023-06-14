import React, { useState, useEffect, useCallback } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Alert
} from 'reactstrap';

import { getSupplier } from 'api/supplier';

const View = ({ id, isOpen, toggle }) => {
  const [supplier, setSupplier] = useState({});

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

  const fetchSupplier = useCallback(async () => {
    if (id) {
      const result = await getSupplier(id);
      setSupplier(result);
    }
  }, [id]);

  useEffect(() => {
    fetchSupplier();
  }, [fetchSupplier]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>View Supplier</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row className='mb-2'>
          <Col lg='4' md='6'>
            <Label>Name</Label>
            <span className='form-control text-capitalize'>
              {supplier.name}
            </span>
          </Col>
          <Col lg='4' md='6'>
            <Label>TIN</Label>
            <span className='form-control text-capitalize'>{supplier.tin}</span>
          </Col>
          <Col lg='4' md='6'>
            <Label>Contact Number</Label>
            <span className='form-control'>{supplier.contactNumber}</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col>
            <Label>Address</Label>
            <span className='form-control'>{supplier.address}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Bank Details</Label>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col lg='4' md='6'>
            <Label>Check Payee</Label>
            <span className='form-control text-capitalize'>
              {supplier.name}
            </span>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </Modal>
  );
};

export default View;
