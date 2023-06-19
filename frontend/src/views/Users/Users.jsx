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
import NotificationAlert from 'react-notification-alert';

// Sample Data
import { getRole } from 'helper/sampleData/sampleRoles';
import getFullName from 'helper/getFullName';

import DataTable from 'components/DataTable/DataTable';

// Actions
import Add from './actions/Add';
import View from './actions/View';
import Update from './actions/Update';
import Delete from './actions/Delete';
import { getUsers } from 'api/user';
import getLoggedUser from 'helper/getLoggedUser';
import roles from 'constants/roles';

function Users() {
  const [roleId, setRoleId] = useState(0);

  useEffect(() => {
    const { roleId } = getLoggedUser();
    setRoleId(roleId);
  }, []);

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

  const notifyRef = React.useRef(null);
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

  // Modal
  const [itemId, setItemId] = useState();
  const [modalType, setModalType] = useState();
  const [modalState, setModalState] = useState(false);
  const toggleModal = () => {
    setModalState(!modalState);
    fetchUsers();
  };
  const handleModal = (type, id = '') => {
    setModalType(type);
    setItemId(id);
    setModalState(true);
  };

  const displayModal = () => {
    if (modalState) {
      switch (modalType) {
        case 'view':
          return (
            <View
              id={itemId}
              toggle={toggleModal}
              isOpen={modalState}
              notify={handleNotify}
            />
          );
        case 'update':
          return (
            <Update
              id={itemId}
              toggle={toggleModal}
              isOpen={modalState}
              notify={handleNotify}
            />
          );
        case 'delete':
          return (
            <Delete
              id={itemId}
              toggle={toggleModal}
              isOpen={modalState}
              notify={handleNotify}
            />
          );
        default:
          break;
      }
    }
    return '';
  };

  const fetchUsers = useCallback(async () => {
    let rows = [];
    try {
      rows = await getUsers();
    } catch (error) {
      console.error(error);
    }

    const userList = rows.map((user) => {
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
          {[roles.APPROVER].includes(roleId) && (
            <>
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
          )}
        </>
      ];
    });

    setRows(userList);
  }, [roleId]);

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
      <NotificationAlert ref={notifyRef} />
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle tag='h4'>Users</CardTitle>
                </Col>
                {[roles.APPROVER].includes(roleId) && (
                  <Col className='text-right'>
                    <Add onChange={fetchUsers} notify={handleNotify} />
                  </Col>
                )}
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
