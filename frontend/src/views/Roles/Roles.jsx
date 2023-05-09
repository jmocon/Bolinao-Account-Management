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
import sampleRoles from 'helper/sampleData/sampleRoles';

import DataTable from 'components/DataTable/DataTable';

// Actions
import View from './actions/View';

function Roles() {
  const [rows, setRows] = useState([]);
  const columns = ['Name', 'Color', 'Output', 'Actions'];

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
        case 'view':
          return (
            <View
              roleId={itemId}
              toggle={toggleModal}
              isOpen={modalState}
              notification={handleNotify}
            />
          );
        // case 'add':
        // 	return (
        //     <Add
        //       toggle={toggleModal}
        //       isOpen={modalState}
        //       notif={handleNotify}
        //     />
        //   );
        // case 'update':
        // 	return <Update id={itemId} toggle={toggleModal} isOpen={modalState} notif={handleNotify} />;
        // case 'delete':
        // 	return <Delete id={itemId} toggle={toggleModal} isOpen={modalState} notif={handleNotify} />;
        default:
          break;
      }
    }
    return '';
  };

  const fetchRoles = useCallback(() => {
    const roleList = sampleRoles.map((role) => [
      role.name,
      role.color,
      <Badge color={role.color}>{role.name}</Badge>,
      <>
        <Button
          size='sm'
          color='info'
          title='View'
          className='btn-icon mr-1'
          onClick={() => handleModal('view', role.roleId)}>
          <i className='tim-icons icon-zoom-split'></i>
        </Button>
        <Button
          size='sm'
          color='success'
          title='Edit'
          className='btn-icon mr-1'
          onClick={() => handleModal('update', role.roleId)}>
          <i className='tim-icons icon-pencil'></i>
        </Button>
        <Button
          size='sm'
          color='danger'
          title='Delete'
          className='btn-icon mr-1'
          onClick={() => handleModal('delete', role.roleId)}>
          <i className='tim-icons icon-simple-remove'></i>
        </Button>
      </>
    ]);

    setRows(roleList);
  }, []);

  useEffect(() => {
    fetchRoles();
    const interval = setInterval(() => {
      fetchRoles();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchRoles]);

  return (
    <div className='content'>
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle tag='h4'>Roles</CardTitle>
                </Col>
                <Col className='text-right'>
                  <Button
                    color='info'
                    size='sm'
                    title='View'
                    onClick={() => handleModal('add')}
                    className='animation-on-hover'>
                    <i className='fa fa-plus'></i> Add New Roles
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

export default Roles;
