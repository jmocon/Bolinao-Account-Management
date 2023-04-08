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

import RoleDropdown from 'components/Dropdown/RoleDropdown';
import { addUser } from 'api/user';
import ShowTemporaryPassword from 'views/Deposits/components/ShowTemporaryPassword';

const Add = ({ onChange, notify }) => {
  // Notification
  const defaultAlert = {
    color: 'primary',
    message: '',
    visible: false
  };
  const [alert, setAlert] = useState(defaultAlert);
  const onDismiss = () => setAlert(defaultAlert);

  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState({});
  const [tempPass, setTempPass] = useState('');
  const [isShowPassOpen, setIsShowPassOpen] = useState(false);

  const handleInput = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const toggleModal = () => {
    setInputs({});
    setSubmitted(false);
    onDismiss();
    setIsOpen((currState) => !currState);
  };

  const CheckContent = () => {
    setSubmitted(true);
    return !inputs.firstName || !inputs.emailAddress || !inputs.username;
  };

  const handleAdd = async () => {
    if (CheckContent()) {
      setAlert({
        color: 'danger',
        message: 'Complete all required fields',
        visible: true
      });
      return;
    }

    let result;
    try {
      result = await addUser(inputs);
    } catch (error) {
      setAlert({
        color: 'danger',
        message: error.message,
        visible: true
      });
      return;
    }

    if (!result.success) {
      setAlert({
        color: 'danger',
        message: result.message,
        visible: true
      });
      return;
    }
    setTempPass(result.temporaryPassword);
    setIsShowPassOpen(true);
  };
  const togglePass = () => {
    setIsShowPassOpen(false);
    onChange();
    toggleModal();
    notify('success', 'Successfully added user.', 'tim-icons icon-check-2');
  };

  return (
    <>
      <Button
        color='info'
        size='sm'
        title='Add'
        onClick={toggleModal}
        className='animation-on-hover'>
        <i className='fa fa-plus'></i> Add New User
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
        <ModalHeader toggle={toggleModal}>Add User</ModalHeader>
        <ModalBody>
          <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
            {alert.message}
          </Alert>
          <Row>
            <Col lg='3' md='6'>
              <Label>First Name</Label>
              <Input
                defaultValue={inputs.firstName}
                placeholder='First Name'
                invalid={!inputs.firstName && submitted}
                onChange={(e) => handleInput('firstName', e.target.value)}
              />
            </Col>
            <Col lg='3' md='6'>
              <Label>Middle Name</Label>
              <Input
                defaultValue={inputs.middleName}
                placeholder='Middle Name'
                onChange={(e) => handleInput('middleName', e.target.value)}
              />
            </Col>
            <Col lg='3' md='6'>
              <Label>Last Name</Label>
              <Input
                defaultValue={inputs.lastName}
                placeholder='Last Name'
                onChange={(e) => handleInput('lastName', e.target.value)}
              />
            </Col>
            <Col lg='3' md='6'>
              <Label>Suffix Name</Label>
              <Input
                defaultValue={inputs.suffixName}
                placeholder='Suffix Name'
                onChange={(e) => handleInput('suffixName', e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col lg='3' md='6'>
              <Label>Birth Date</Label>
              <Input
                type='date'
                defaultValue={inputs.birthDate}
                placeholder='Birth Date'
                onChange={(e) => handleInput('birthDate', e.target.value)}
              />
            </Col>
            <Col lg='3' md='6'>
              <Label>Gender</Label>
              <Input
                type='select'
                value={inputs.gender}
                placeholder='Gender'
                onChange={(e) => handleInput('gender', e.target.value)}>
                <option value='0'>Male</option>
                <option value='1'>Female</option>
              </Input>
            </Col>
            <Col lg='3' md='6'>
              <Label>Contact Number</Label>
              <Input
                defaultValue={inputs.contactNumber}
                placeholder='(+639) 12345 6789'
                onChange={(e) => handleInput('contactNumber', e.target.value)}
              />
            </Col>
            <Col lg='3' md='6'>
              <Label>Email Address</Label>
              <Input
                defaultValue={inputs.emailAddress}
                placeholder='Email Address'
                invalid={!inputs.emailAddress && submitted}
                onChange={(e) => handleInput('emailAddress', e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Home Address</Label>
              <Input
                type='textarea'
                defaultValue={inputs.homeAddress}
                placeholder='House No., Street, District, City'
                onChange={(e) => handleInput('homeAddress', e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col lg='6' md='6'>
              <Label>Role</Label>
              <RoleDropdown
                value={inputs.roleId}
                label='Roles'
                onChange={(e) => handleInput('roleId', e)}
              />
            </Col>
            <Col lg='6' md='6'>
              <Label>Username</Label>
              <Input
                defaultValue={inputs.username}
                placeholder='Username'
                invalid={!inputs.username && submitted}
                onChange={(e) => handleInput('username', e.target.value)}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className='p-4 justify-content-end'>
          <Button color='info' onClick={handleAdd} className='mr-2'>
            Add
          </Button>
          <Button color='default' onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {tempPass}
      <ShowTemporaryPassword
        isOpen={isShowPassOpen}
        toggle={togglePass}
        password={tempPass}
      />
    </>
  );
};

export default Add;
