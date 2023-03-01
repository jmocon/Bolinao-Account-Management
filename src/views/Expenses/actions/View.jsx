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

// Sample Data
import { getRole } from 'helper/sampleData/sampleRoles';
import { sampleUser } from 'helper/sampleData/sampleUsers';

const View = ({ userId, isOpen, toggle, toast }) => {
  const [user, setUser] = useState({})
  const role = getRole(user.roleId);

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
  	// const data = {
  	// 	Function: 'getdisplaybyid',
  	// 	User_Id: userId
  	// };
  	// axios
  	// 	.post('/User.php', data)
  	// 	.then((response) => {
  	// 		var u = response.data.Model;

  	// 	})
  	// 	.catch(() => handleNotif('danger', 'Error', 'Connection Error'));
  }, [userId]);

  // const handleNotif = (color, title, message) => {
  // var msg = message;
  // if (title) {
  //   msg = (
  //     <span>
  //       <b>{title} - </b> {msg}
  //     </span>
  //   );
  // }
  // setNotif({ color: color, message: msg, visible: true });
  // };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>View User</ModalHeader>
      <ModalBody>
        <Alert color={notif.color} isOpen={notif.visible} toggle={onDismiss}>
          {notif.message}
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
            <span className='form-control'>{user.gender}</span>
          </Col>
          <Col lg='4' md='6'>
            <Label>Contact Number</Label>
            <span className='form-control'>{user.contactNumber}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Home Address</Label>
            <span className='form-control'>{user.address}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Employee Id</Label>
            <span className='form-control'>{user.userId}</span>
          </Col>
          <Col>
            <Label>Role</Label>
            <span className='form-control'>{role.name}</span>
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
