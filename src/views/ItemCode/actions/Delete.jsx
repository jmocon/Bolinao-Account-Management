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

import { getItemCode, deleteItemCode } from 'api/itemCode';

const Delete = ({ id, isOpen, toggle, notify }) => {
  const [itemCode, setItemCode] = useState({});

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

  const fetchItemCode = useCallback(async () => {
    if (id) {
      const result = await getItemCode(id);
      setItemCode(result);
    }
  }, [id]);

  useEffect(() => {
    fetchItemCode();
  }, [fetchItemCode]);

  const handleDelete = async () => {
    try {
      await deleteItemCode(id);
    } catch (error) {
      setNotif({
        color: 'danger',
        message: error,
        visible: false
      });
      return;
    }

    notify('success', 'Successfully deleted itemCode.', 'tim-icons icon-check-2');

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>Delete Item Code</ModalHeader>
      <ModalBody>
        <Alert color={notif.color} isOpen={notif.visible} toggle={onDismiss}>
          {notif.message}
        </Alert>
        <Row>
          <Col>
            <h3>Delete the Item Code?</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Name</Label>
            <span className='form-control'>{itemCode.name}</span>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='danger' onClick={handleDelete} className='mr-2'>
          Delete
        </Button>
        <Button color='default' onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Delete;
