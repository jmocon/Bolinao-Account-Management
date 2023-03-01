import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Alert
} from 'reactstrap';

import sampleRoles from 'helper/sampleData/sampleRoles';

import RoleDropdown from 'components/Dropdown/RoleDropdown';

const Add = ({ isOpen, toggle }) => {
  const defaultRole = sampleRoles.find((role) => role.roleId === 3);
  const [role, setRole] = useState({
    value: defaultRole.roleId,
    label: defaultRole.name
  });
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [suffixName, setSuffixName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState(0);
  const [username, setUsername] = useState('');

  // Checks if valid or not
  const [submitted, setSubmitted] = useState(false);
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

  const CheckContent = () => {
    var error = false;
    if (!firstName) {
      error = true;
    }
    if (!emailAddress) {
      error = true;
    }
    if (!username) {
      error = true;
    }
    setSubmitted(true);
    return error;
  };

  const handleNotif = (color, message, title = '') => {
    var msg = message;
    if (title) {
      msg = (
        <span>
          <b>{title} - </b> {msg}
        </span>
      );
    }
    setNotif({ color: color, message: msg, visible: true });
  };

  const handleAdd = () => {
    if (CheckContent()) {
      handleNotif(
        'danger',
        'Kindly fill-up required details.',
        'Incomplete Details'
      );
    } else {
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>Add User</ModalHeader>
      <ModalBody>
        <Alert color={notif.color} isOpen={notif.visible} toggle={onDismiss}>
          {notif.message}
        </Alert>
        <Row>
          <Col lg='3' md='6'>
            <Label>First Name</Label>
            <Input
              value={firstName}
              placeholder='First Name'
              invalid={!firstName && submitted}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Col>
          <Col lg='3' md='6'>
            <Label>Middle Name</Label>
            <Input
              defaultValue={middleName}
              placeholder='Middle Name'
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </Col>
          <Col lg='3' md='6'>
            <Label>Last Name</Label>
            <Input
              defaultValue={lastName}
              placeholder='Last Name'
              onChange={(e) => setLastName(e.target.value)}
            />
          </Col>
          <Col lg='3' md='6'>
            <Label>Suffix Name</Label>
            <Input
              defaultValue={suffixName}
              placeholder='Suffix Name'
              onChange={(e) => setSuffixName(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col lg='3' md='6'>
            <Label>Birth Date</Label>
            <Input
              type='date'
              defaultValue={birthDate}
              placeholder='Birth Date'
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </Col>
          <Col lg='3' md='6'>
            <Label>Gender</Label>
            <Input
              type='select'
              value={gender}
              placeholder='Gender'
              onChange={(e) => setGender(e.target.value)}>
              <option value='0'>Male</option>
              <option value='1'>Female</option>
            </Input>
          </Col>
          <Col lg='3' md='6'>
            <Label>Contact Number</Label>
            <Input
              defaultValue={contactNumber}
              placeholder='(+639) 12345 6789'
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </Col>
          <Col lg='3' md='6'>
            <Label>Email Address</Label>
            <Input
              defaultValue={emailAddress}
              placeholder='Email Address'
              invalid={!emailAddress && submitted}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Home Address</Label>
            <Input
              type='textarea'
              defaultValue={address}
              placeholder='House No., Street, District, City'
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col lg='6' md='6'>
            <Label>Role</Label>
            <RoleDropdown
              value={role}
              label='Roles'
              onChange={(e) => setRole(e)}
            />
          </Col>
          <Col lg='6' md='6'>
            <Label>Username</Label>
            <Input
              defaultValue={username}
              placeholder='Username'
              invalid={!username && submitted}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='info' onClick={handleAdd} className='mr-2'>
          Add
        </Button>
        <Button color='default' onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Add;
