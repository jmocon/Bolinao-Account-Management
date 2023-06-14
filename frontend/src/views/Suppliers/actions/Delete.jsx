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

import { getSupplier, deleteSupplier } from 'api/supplier';

const Delete = ({ id, isOpen, toggle, notify }) => {
  const [supplier, setSupplier] = useState({});

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

  const fetchSupplier = useCallback(async () => {
    if (id) {
      const result = await getSupplier(id);
      setSupplier(result);
    }
  }, [id]);

  useEffect(() => {
    fetchSupplier();
  }, [fetchSupplier]);

  const handleDelete = async () => {
    try {
      await deleteSupplier(id);
    } catch (error) {
      setNotif({
        color: 'danger',
        message: error,
        visible: false
      });
      return;
    }

    notify('success', 'Successfully deleted supplier.', 'tim-icons icon-check-2');

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>Delete Supplier</ModalHeader>
      <ModalBody>
        <Alert color={notif.color} isOpen={notif.visible} toggle={onDismiss}>
          {notif.message}
        </Alert>
        <Row>
          <Col>
            <h3>Delete the Supplier?</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Name</Label>
            <span className='form-control'>{supplier.name}</span>
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
