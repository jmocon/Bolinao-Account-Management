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
  Input,
  Alert
} from 'reactstrap';

import { getUser, updateUser } from 'api/user';
import RoleDropdown from 'components/Dropdown/RoleDropdown';
import defaultAlert from 'constants/defaultAlert';
import useAlert from 'helper/useAlert';
import confirmOnClose from 'helper/confirmOnClose';

const Update = ({ id, isOpen, toggle, notify }) => {
  const [alert, setAlert] = useState(defaultAlert);
  const alertFn = useAlert(setAlert);

  const [submitted, setSubmitted] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [inputs, setInputs] = useState({});
  const handleInput = (name, value) => {
    setIsDirty(true);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const toggleModal = () => {
    if (!confirmOnClose(isDirty)) {
      return;
    }

    setInputs({});
    setIsDirty(false);
    toggle();
  };

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

      setInputs(result);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const CheckContent = () =>
    !inputs.firstName || !inputs.emailAddress || !inputs.username;

  const handleUpdate = async () => {
    setSubmitted(true);

    if (CheckContent()) {
      alertFn.danger('Complete all required fields');
      return;
    }

    let result;
    try {
      result = await updateUser(id, inputs);
    } catch (error) {
      alertFn.danger(`Error occurred while updating user: ${error}`);
      return;
    }

    if (!result.success) {
      alertFn.danger(`Error occurred while updating user: ${result.message}`);
      return;
    }

    notify('success', 'Successfully updated user.', 'tim-icons icon-check-2');
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
      <ModalHeader toggle={toggleModal}>Update User</ModalHeader>
      <ModalBody>
        <Alert
          color={alert.color}
          isOpen={alert.visible}
          toggle={alertFn.dismiss}>
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
        <Button color='info' onClick={handleUpdate} className='mr-2'>
          Update
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Update;
