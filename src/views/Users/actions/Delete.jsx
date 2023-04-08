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

import getFullName from 'helper/getFullName';
import { deleteUser, getUser } from 'api/user';
import { getRole } from 'helper/sampleData/sampleRoles';

const Delete = ({ id, isOpen, toggle, notify }) => {
  const [user, setUser] = useState({});

  // Notification
  const defaultAlert = {
    color: 'primary',
    message: '',
    visible: false
  };
  const [alert, setAlert] = useState(defaultAlert);
  const onDismiss = () => setAlert(defaultAlert);

  useEffect(() => {
    const fetchData = async () => {
      let result = {};
      try {
        result = await getUser(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error while fetching User: ${error}`,
          visible: true
        });
      }

      const role = getRole(result.roleId);

      setUser({ ...result, roleName: role.name });
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteUser(id);
    } catch (error) {
      setAlert({
        color: 'danger',
        message: error,
        visible: false
      });
      return;
    }

    notify('success', 'Successfully deleted user.', 'tim-icons icon-check-2');

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>Delete User</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
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
        <Button color='default' onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Delete;
