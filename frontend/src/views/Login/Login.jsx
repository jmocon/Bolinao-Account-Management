import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Container,
  Label,
  Input,
  Button,
  Alert
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import useAlert from 'helper/useAlert';
import defaultAlert from 'constants/defaultAlert';
import { login } from 'api/user';

const Login = () => {
  const [alert, setAlert] = useState(defaultAlert);
  const alertFn = useAlert(setAlert);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    if (!username || !password) {
      alertFn.danger('Complete all required fields');
      return;
    }

    let result;
    try {
      result = await login({ username, password });
    } catch (error) {
      alertFn.danger(error);
      return;
    }

    if (!result.success) {
      alertFn.danger(result.message);
      return;
    }

    const data = {
      userId: result.userId,
      username: result.username,
      roleId: result.roleId
    };

    localStorage.setItem('user', JSON.stringify(data));
    history.push('/');
    return <></>;
  };

  return (
    <div className='content'>
      <Container>
        <Row>
          <Col
            md={{
              offset: 3,
              size: 6
            }}
            lg={{
              offset: 4,
              size: 4
            }}
            className='py-4'>
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <CardTitle tag='h1' className='text-center'>
                      Login
                    </CardTitle>
                  </Col>
                </Row>
                <Alert
                  color={alert.color}
                  isOpen={alert.visible}
                  toggle={alertFn.dismiss}>
                  {alert.message}
                </Alert>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Label>Username</Label>
                    <Input
                      placeholder='Username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col>
                    <Label>Password</Label>
                    <Input
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col className='text-center'>
                    <Button onClick={handleLogin}>Login</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
