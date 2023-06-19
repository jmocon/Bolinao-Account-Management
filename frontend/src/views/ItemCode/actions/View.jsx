import React, { useState, useEffect, useCallback } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Alert
} from 'reactstrap';

import { getItemCode } from 'api/itemCode';

const View = ({ id, isOpen, toggle }) => {
  const [itemCode, setItemCode] = useState({});

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

  const fetchItemCode = useCallback(async () => {
    if (id) {
      const result = await getItemCode(id);
      setItemCode(result);
    }
  }, [id]);

  useEffect(() => {
    fetchItemCode();
  }, [fetchItemCode]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>View ItemCode</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row>
          <Col>
            <Label>Name</Label>
            <span className='form-control'>{itemCode.name}</span>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
      </ModalFooter>
    </Modal>
  );
};

export default View;
