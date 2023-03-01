import React, { useState, useEffect } from 'react';
// import axios from '../../../Axios';
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
// import Select from 'react-select';

// Sample Data
import sampleRoles, { getRole } from 'helper/sampleData/sampleRoles';
import { sampleUser } from 'helper/sampleData/sampleUsers';

const Update = ({ id, isOpen, toggle }) => {
  const [role, setRole] = useState({ value: 0, label: '' });
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
  const [roles, setRoles] = useState([]);
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

  useEffect(() => {
    setRoles(sampleRoles);
    // var data = {
    // 	Function: 'dropdown'
    // };
    // axios
    // 	.post('/Role.php', data)
    // 	.then((response) => {
    // 		setRoles(response.data.List);
    // 	})
    // 	.catch(() => handleNotif('danger', 'Error', 'Connection Error'));
  }, []);

  useEffect(() => {
    // const data = {
    // 	Function: 'getbyid',
    // 	User_Id: props.id
    // };
    // axios
    // 	.post('/User.php', data)
    // 	.then((response) => {
    // 		var u = response.data.Model;
    const user = sampleUser();
    const role = getRole(user.roleId);
    setRole({ value: role.roleId, label: role.name });
    setFirstName(user.firstName);
    setMiddleName(user.middleName);
    setLastName(user.lastName);
    setSuffixName(user.suffixName);
    setAddress(user.address);
    setContactNumber(user.contactNumber);
    setEmailAddress(user.emailAddress);
    setBirthDate(user.birthDate);
    setGender(user.gender);
    setUsername(user.username);
    // 	})
    // 	.catch(() => handleNotif('danger', 'Error', 'Connection Error'));
  }, [id]);

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

  const handleNotif = (color, title, message) => {
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

  const handleUpdate = () => {
    if (CheckContent()) {
      handleNotif(
        'danger',
        'Incomplete Details',
        'Kindly fillup required details.'
      );
    } else {
      // const data = {
      // 	Function: 'update',
      // 	Model: {
      // 		User_Id: props.id,
      // 		roleId: role.value,
      // 		FirstName: firstName,
      // 		MiddleName: middleName,
      // 		LastName: lastName,
      // 		SuffixName: suffixName,
      // 		Address: address,
      // 		ContactNumber: contactNumber,
      // 		EmailAddress: emailAddress,
      // 		BirthDate: birthDate,
      // 		Gender: gender,
      // 		Username: username
      // 	}
      // };
      // axios
      // 	.post('/User.php', data)
      // 	.then((response) => {
      // 		if (response.data.Success) {
      // 			props.notif('success', 'Successfully updated user.');
      // 			props.toggle();
      // 		} else {
      // 			handleNotif('danger', 'Error', response.data.Message);
      // 		}
      // 	})
      // 	.catch(() => handleNotif('danger', 'Error', 'Connection Error'));
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>Update User</ModalHeader>
      <ModalBody>
        <Alert color={notif.color} isOpen={notif.visible} toggle={onDismiss}>
          {notif.message}
        </Alert>
        <Row>
          <Col lg='3' md='6'>
            <Label>First Name</Label>
            <Input
              value={firstName}
              placeholder='Juan'
              invalid={!firstName && submitted}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Col>
          <Col lg='3' md='6'>
            <Label>Middle Name</Label>
            <Input
              defaultValue={middleName}
              placeholder='Dela'
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </Col>
          <Col lg='3' md='6'>
            <Label>Last Name</Label>
            <Input
              defaultValue={lastName}
              placeholder='Cruz'
              onChange={(e) => setLastName(e.target.value)}
            />
          </Col>
          <Col lg='3' md='6'>
            <Label>Suffix Name</Label>
            <Input
              defaultValue={suffixName}
              placeholder='Jr'
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
              placeholder='+63 912 345 6789'
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </Col>
          <Col lg='3' md='6'>
            <Label>Email Address</Label>
            <Input
              defaultValue={emailAddress}
              placeholder='email@whjewels.com'
              invalid={!emailAddress && submitted}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Home Address</Label>
            <Input
						className='pl-3'
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
            {/* <Select
							classNamePrefix='sel_fc'
							isSearchable
							label='Roles'
							options={roles}
							value={role}
							onChange={(e) => setRole(e)}
						/> */}
            <Input
              type='select'
              value={role}
              placeholder='Role'
              onChange={(e) => setRole(e.target.value)}>
              {roles.map((roleOption) => (
                <option value={roleOption.roleId}>{roleOption.name}</option>
              ))}
            </Input>
          </Col>
          <Col lg='6' md='6'>
            <Label>Username</Label>
            <Input
              defaultValue={username}
              placeholder='jdcruz'
              invalid={!username && submitted}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='info' onClick={handleUpdate} className='mr-2'>
          Update
        </Button>
        <Button color='default' onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Update;
