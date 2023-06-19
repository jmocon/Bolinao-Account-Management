import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button
} from 'reactstrap';
import NotificationAlert from 'react-notification-alert';

import DataTable from 'components/DataTable/DataTable';

import Add from './actions/Add';
import View from './actions/View';
import Update from './actions/Update';
import Delete from './actions/Delete';
import { getCompanies } from 'api/company';
import getLoggedUser from 'helper/getLoggedUser';
import roles from 'constants/roles';

const Company = () => {
  const [roleId, setRoleId] = useState(0);

  useEffect(() => {
    const { roleId } = getLoggedUser();
    setRoleId(roleId);
  }, []);
  const [rows, setRows] = useState([]);
  const columns = ['Code', 'Name', 'Actions'];

  // Modal
  const [itemId, setItemId] = useState();
  const [modalType, setModalType] = useState();
  const [modalState, setModalState] = useState(false);
  const toggleModal = () => {
    fetchCompanies();
    setModalState(!modalState);
  };
  const handleModal = (type, id = '') => {
    setModalType(type);
    setItemId(id);
    setModalState(true);
  };

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

  const displayModal = () => {
    if (modalState) {
      switch (modalType) {
        case 'view':
          return <View id={itemId} toggle={toggleModal} isOpen={modalState} />;
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

  const fetchCompanies = useCallback(async () => {
    let rows = [];
    try {
      rows = await getCompanies();
    } catch (error) {
      handleNotify('danger', error.message, 'tim-icons icon-simple-remove');
    }

    const result = rows.map((company) => {
      return [
        company.code,
        company.name,
        <>
          <Button
            size='sm'
            color='info'
            title='View'
            className='btn-icon mr-1'
            onClick={() => handleModal('view', company.companyId)}>
            <i className='tim-icons icon-zoom-split'></i>
          </Button>
          {[roles.APPROVER].includes(roleId) && (
            <>
              <Button
                size='sm'
                color='success'
                title='Edit'
                className='btn-icon mr-1'
                onClick={() => handleModal('update', company.companyId)}>
                <i className='tim-icons icon-pencil'></i>
              </Button>
              <Button
                size='sm'
                color='danger'
                title='Delete'
                className='btn-icon mr-1'
                onClick={() => handleModal('delete', company.companyId)}>
                <i className='tim-icons icon-simple-remove'></i>
              </Button>
            </>
          )}
        </>
      ];
    });

    setRows(result);
  }, [roleId]);

  useEffect(() => {
    fetchCompanies();
    const interval = setInterval(() => {
      fetchCompanies();
    }, 100000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchCompanies]);

  return (
    <div className='content'>
      <NotificationAlert ref={notifyRef} />
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle tag='h4'>Companies</CardTitle>
                </Col>
                {[roles.APPROVER].includes(roleId) && (
                  <Col className='text-right'>
                    <Add onChange={fetchCompanies} notify={handleNotify} />
                  </Col>
                )}
              </Row>
            </CardHeader>
            <CardBody>
              <DataTable
                title='Company'
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
};

export default Company;
