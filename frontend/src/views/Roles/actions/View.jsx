import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Alert,
  Badge
} from 'reactstrap';
// import axios from 'helper/axios';

// Sample Data
import { getRole } from 'helper/sampleData/sampleRoles';
import DataTable from 'components/DataTable/DataTable';

const View = ({ roleId, isOpen, toggle, notification }) => {
  const [role, setRole] = useState({});

  // Notification
  const [notice, setNotice] = useState({
    color: 'primary',
    message: '',
    visible: false
  });
  const onDismiss = () =>
    setNotice({
      color: 'primary',
      message: '',
      visible: false
    });

  useEffect(() => {
    setRole(getRole(roleId));
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
  }, [roleId]);

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

  const pageAccessColumns = ['Content', 'View', 'Add', 'Edit', 'Delete'];
  const pageAccessRows = [
    ['Suppliers', 'No', 'No', 'No', 'No'],
    ['Users', 'Yes', 'Yes', 'Yes', 'Yes'],
    ['Roles', 'Yes', 'No', 'No', 'No']
  ];

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>View Role</ModalHeader>
      <ModalBody>
        <Alert color={notice.color} isOpen={notice.visible} toggle={onDismiss}>
          {notice.message}
        </Alert>
        <Row className='mb-2'>
          <Col md='6'>
            <Label>Name</Label>
            <span className='form-control text-capitalize'>{role.name}</span>
          </Col>
          <Col md='6'>
            <Label>Color</Label>
            <span className='form-control text-capitalize'>{role.color}</span>
          </Col>
        </Row>
        <Row className='mb-4'>
          <Col>
            <Label>Output</Label>
            <span className='form-control text-center'>
              <Badge color={role.color}>{role.name}</Badge>
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Content Access</Label>
            <DataTable
              title='Content Access'
              columns={pageAccessColumns}
              rows={pageAccessRows}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 d-flex flex-row-reverse'>
      </ModalFooter>
    </Modal>
  );
};

export default View;
