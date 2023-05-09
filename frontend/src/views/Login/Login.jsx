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
  Button
} from 'reactstrap';
import NotificationAlert from 'react-notification-alert';

const Login = () => {
  const notifyRef = React.useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
  }

  return (
    <div className='content'>
      <NotificationAlert ref={notifyRef} />
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
                    <Button>Login</Button>
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
