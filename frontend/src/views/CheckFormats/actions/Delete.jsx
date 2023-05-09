import React, { useState, useEffect } from 'react';
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

import { getCheckFormat, deleteCheckFormat } from 'api/checkFormat';

const Delete = ({ id, isOpen, toggle, notify }) => {
  const [check, setCheckFormat] = useState({});

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
    const fetchCheckFormat = async () => {
      if (id) {
        const result = await getCheckFormat(id);
        setCheckFormat(result);
      }
    };
    fetchCheckFormat();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteCheckFormat(id);
    } catch (error) {
      setAlert({
        color: 'danger',
        message: error,
        visible: false
      });
      return;
    }

    notify('success', 'Successfully deleted check.', 'tim-icons icon-check-2');

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>Delete Check Format</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row>
          <Col>
            <h3>Delete the Check Format?</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Name</Label>
            <span className='form-control'>{check.name}</span>
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
