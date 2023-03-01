import React, { useState, useEffect } from 'react';
// reactstrap components
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

// Sample Data
import { sampleUser } from 'helper/sampleData/sampleUsers';

import getFullName from 'helper/getFullName';

const Delete = (props) => {
  const [user, setUser] = useState('');
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

  useEffect(() => {
    setUser(sampleUser());
  }, [props]);

  const handleDelete = () => {
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} size='lg'>
      <ModalHeader toggle={props.toggle}>Delete User</ModalHeader>
      <ModalBody>
        <Alert color={notif.color} isOpen={notif.visible} toggle={onDismiss}>
          {notif.message}
        </Alert>
        <Row>
          <Col>
            <h3>Delete the user?</h3>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <Label>Name</Label>
            <span className='form-control'>
              {getFullName({
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                suffixName: user.suffixName
              })}
            </span>
          </Col>
          <Col md='6'>
            <Label>Email address</Label>
            <span className='form-control'>{user.emailAddress}</span>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='danger' onClick={handleDelete} className='mr-2'>
          Delete
        </Button>
        <Button color='default' onClick={props.toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Delete;
