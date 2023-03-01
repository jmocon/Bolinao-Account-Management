import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Badge,
  Button
} from 'reactstrap';

// Sample Data
import { getRole } from 'helper/sampleData/sampleRoles';
import sampleUsers from 'helper/sampleData/sampleUsers';

import getFullName from 'helper/getFullName';

import DataTable from 'components/DataTable/DataTable';

// Actions
import Add from './actions/Add';
import View from './actions/View';
import Update from './actions/Update';
import Delete from './actions/Delete';

function Users() {
  // DataTable
  const [rows, setRows] = useState([]);
  const columns = [
    'Employee Id',
    'Role',
    'Name',
    'Email Address',
    'Contact No.',
    'Actions'
  ];

  const handleNotify = () => {};

  // Modal
  const [itemId, setItemId] = useState();
  const [modalType, setModalType] = useState();
  const [modalState, setModalState] = useState(false);
  const toggleModal = () => setModalState(!modalState);
  const handleModal = (type, id = '') => {
    setModalType(type);
    setItemId(id);
    setModalState(true);
  };

  const displayModal = () => {
    if (modalState) {
      switch (modalType) {
        case 'add':
          return (
            <Add
              toggle={toggleModal}
              isOpen={modalState}
              notif={handleNotify}
            />
          );
        case 'view':
          return (
            <View
              userId={itemId}
              toggle={toggleModal}
              isOpen={modalState}
              toast={handleNotify}
            />
          );
        case 'update':
          return (
            <Update
              id={itemId}
              toggle={toggleModal}
              isOpen={modalState}
              notif={handleNotify}
            />
          );
        case 'delete':
          return (
            <Delete
              id={itemId}
              toggle={toggleModal}
              isOpen={modalState}
              notif={handleNotify}
            />
          );
        default:
          break;
      }
    }
    return '';
  };

  const fetchUsers = useCallback(() => {
    const userList = sampleUsers().map((user) => {
      const role = getRole(user.roleId);
      return [
        user.userId,
        <Badge color={role.color}>{role.name}</Badge>,
        getFullName({
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          suffixName: user.suffixName
        }),
        user.emailAddress,
        user.contactNumber,
        <>
          <Button
            size='sm'
            color='info'
            title='View'
            className='btn-icon mr-1'
            onClick={() => handleModal('view', user.userId)}>
            <i className='tim-icons icon-zoom-split'></i>
          </Button>
          <Button
            size='sm'
            color='success'
            title='Edit'
            className='btn-icon mr-1'
            onClick={() => handleModal('update', user.userId)}>
            <i className='tim-icons icon-pencil'></i>
          </Button>
          <Button
            size='sm'
            color='danger'
            title='Delete'
            className='btn-icon mr-1'
            onClick={() => handleModal('delete', user.userId)}>
            <i className='tim-icons icon-simple-remove'></i>
          </Button>
        </>
      ];
    });

    setRows(userList);
  }, []);

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(() => {
      fetchUsers();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchUsers]);

  return (
    <div className='content'>
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle tag='h4'>Users</CardTitle>
                </Col>
                <Col className='text-right'>
                  <Button
                    color='info'
                    size='sm'
                    title='View'
                    onClick={() => handleModal('add')}
                    className='animation-on-hover'>
                    <i className='fa fa-plus'></i> Add New User
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <DataTable
                title='Users'
                columns={columns}
                rows={rows}
                withAction
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {displayModal()}
    </div>
  );
}

export default Users;
