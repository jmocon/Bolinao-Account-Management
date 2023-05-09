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
import { getUser } from 'api/user';
import genders from 'constants/genders';
import { getRole } from 'helper/sampleData/sampleRoles';

const View = ({ id, isOpen, toggle, notify }) => {
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

      setUser({...result,roleName: role.name});
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>View User</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row>
          <Col md='6'>
            <Label>Full Name</Label>
            <span className='form-control text-capitalize'>
              {getFullName({
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                suffixName: user.suffixName
              })}
            </span>
          </Col>
          <Col lg='6' md='6'>
            <Label>Email Address</Label>
            <span className='form-control'>{user.emailAddress}</span>
          </Col>
          
        </Row>
        <Row>
          <Col lg='4' md='6'>
            <Label>Birth Date</Label>
            <span className='form-control'>{user.birthDate}</span>
          </Col>
          <Col lg='4' md='6'>
            <Label>Gender</Label>
            <span className='form-control'>{genders[user.gender]}</span>
          </Col>
          <Col lg='4' md='6'>
            <Label>Contact Number</Label>
            <span className='form-control'>{user.contactNumber}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Home Address</Label>
            <span className='form-control'>{user.homeAddress}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Employee Id</Label>
            <span className='form-control'>{user.userId}</span>
          </Col>
          <Col>
            <Label>Role</Label>
            <span className='form-control'>{user.roleName}</span>
          </Col>
          <Col>
            <Label>Username</Label>
            <span className='form-control'>{user.username}</span>
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
