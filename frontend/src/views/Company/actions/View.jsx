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

import { getCompany } from 'api/company';

const View = ({ id, isOpen, toggle }) => {
  const [company, setCompany] = useState({});

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

  const fetchCompany = useCallback(async () => {
    if (id) {
      const result = await getCompany(id);
      setCompany(result);
    }
  }, [id]);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>View Company</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row>
          <Col>
            <Label>Code</Label>
            <span className='form-control'>{company.code}</span>
          </Col>
          <Col>
            <Label>Name</Label>
            <span className='form-control'>{company.name}</span>
          </Col>
          <Col>
            <Label>TIN</Label>
            <span className='form-control'>{company.tin}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Address</Label>
            <span className='form-control'>{company.address}</span>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='default' onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default View;
