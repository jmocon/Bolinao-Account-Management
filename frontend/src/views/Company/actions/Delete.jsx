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

import { getCompany, deleteCompany } from 'api/company';

const Delete = ({ id, isOpen, toggle, notify }) => {
  const [company, setCompany] = useState({});

  // Notification
  const [notif, setNotif] = useState({
    color: 'primary',
    message: '',
    visible: false
  });
  const onDismiss = () =>
    setNotif({
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

  const handleDelete = async () => {
    try {
      await deleteCompany(id);
    } catch (error) {
      setNotif({
        color: 'danger',
        message: error,
        visible: false
      });
      return;
    }

    notify('success', 'Successfully deleted company.', 'tim-icons icon-check-2');

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>Delete Company</ModalHeader>
      <ModalBody>
        <Alert color={notif.color} isOpen={notif.visible} toggle={onDismiss}>
          {notif.message}
        </Alert>
        <Row>
          <Col>
            <h3>Delete the Company?</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Name</Label>
            <span className='form-control'>{company.name}</span>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='danger' onClick={handleDelete} className='mr-2'>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Delete;
