import React, { useEffect, useRef, useState } from 'react';
import NotificationAlert from 'react-notification-alert';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row
} from 'reactstrap';
import genders from 'constants/genders';
import { getUser, updatePassword } from 'api/user';
import { getRole } from 'helper/sampleData/sampleRoles';
import getFullName from 'helper/getFullName';
import defaultAlert from 'constants/defaultAlert';
import useAlert from 'helper/useAlert';

const Profile = () => {
  const [alert, setAlert] = useState(defaultAlert);
  const alertFn = useAlert(setAlert);

  const [inputs, setInputs] = useState({});
  const handleInput = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const [userId, setUserId] = useState(11);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId) {
      setUserId(userId);
    }
  }, []);

  const [user, setUser] = useState({});

  const notifyRef = useRef(null);
  const handleNotify = (type, message, icon = 'tim-icons icon-bell-55') => {
    const options = {
      place: 'bc',
      message,
      type,
      icon,
      autoDismiss: 5
    };
    notifyRef.current.notificationAlert(options);
  };

  useEffect(() => {
    const fetchData = async () => {
      let result = {};
      try {
        result = await getUser(userId);
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

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleChangePassword = async () => {
    if (!inputs.oldPassword || !inputs.newPassword || !inputs.oldPassword) {
      alertFn.danger('Complete all required fields');
    }

    if (inputs.newPassword !== inputs.confirmPassword) {
      alertFn.danger("New Password and Confirm Password didn't matched");
    }

    let result;
    try {
      result = await updatePassword(userId, inputs);
    } catch (error) {
      alertFn.danger(`Error occurred while updating password: ${error}`);
      return;
    }

    if (!result.success) {
      alertFn.danger(result.message);
      return;
    }

    alertFn.success('Successfully updated ');
  };

  return (
    <div className='content'>
      <NotificationAlert ref={notifyRef} />
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle tag='h4'>Profile</CardTitle>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
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
              <hr className='my-5' />
              <Row>
                <Col className='text-center'>
                  <h3>Change Password</h3>
                </Col>
              </Row>
              <Alert
                color={alert.color}
                isOpen={alert.visible}
                toggle={alertFn.dismiss}>
                {alert.message}
              </Alert>
              <Row>
                <Col md={{ offset: 3, size: 6 }}>
                  <Label>Old Password</Label>
                  <Input
                    type='password'
                    defaultValue={inputs.oldPassword}
                    placeholder='Old Password'
                    onChange={(e) => handleInput('oldPassword', e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={{ offset: 3, size: 6 }}>
                  <Label>New Password</Label>
                  <Input
                    type='password'
                    defaultValue={inputs.newPassword}
                    placeholder='New Password'
                    onChange={(e) => handleInput('newPassword', e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={{ offset: 3, size: 6 }}>
                  <Label>Confirm Password</Label>
                  <Input
                    type='password'
                    defaultValue={inputs.confirmPassword}
                    placeholder='Confirm Password'
                    onChange={(e) =>
                      handleInput('confirmPassword', e.target.value)
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col className='text-center'>
                  <Button
                    color='info'
                    onClick={handleChangePassword}
                    className='mt-3'>
                    Update Password
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
