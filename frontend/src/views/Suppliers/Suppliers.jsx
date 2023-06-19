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
import { getSuppliers } from 'api/supplier';
import getLoggedUser from 'helper/getLoggedUser';
import roles from 'constants/roles';

const Suppliers = () => {
  const [roleId, setRoleId] = useState(0);

  useEffect(() => {
    const { roleId } = getLoggedUser();
    setRoleId(roleId);
  }, []);

  const [rows, setRows] = useState([]);
  const columns = ['Supplier Id', 'Name', 'TIN', 'Contact No.', 'Actions'];

  // Modal
  const [itemId, setItemId] = useState();
  const [modalType, setModalType] = useState();
  const [modalState, setModalState] = useState(false);
  const toggleModal = () => {
    fetchSuppliers();
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

  const fetchSuppliers = useCallback(async () => {
    let rows = [];
    try {
      rows = await getSuppliers();
    } catch (error) {
      console.error(error);
    }

    const result = rows.map((supplier) => [
      supplier.supplierId,
      supplier.name,
      supplier.tin,
      supplier.contactNumber,
      <>
        <Button
          size='sm'
          color='info'
          title='View'
          className='btn-icon mr-1'
          onClick={() => handleModal('view', supplier.supplierId)}>
          <i className='tim-icons icon-zoom-split'></i>
        </Button>
        {[roles.APPROVER].includes(roleId) && (
          <>
            <Button
              size='sm'
              color='success'
              title='Edit'
              className='btn-icon mr-1'
              onClick={() => handleModal('update', supplier.supplierId)}>
              <i className='tim-icons icon-pencil'></i>
            </Button>
            <Button
              size='sm'
              color='danger'
              title='Delete'
              className='btn-icon mr-1'
              onClick={() => handleModal('delete', supplier.supplierId)}>
              <i className='tim-icons icon-simple-remove'></i>
            </Button>
          </>
        )}
      </>
    ]);

    setRows(result);
  }, [roleId]);

  useEffect(() => {
    fetchSuppliers();
    const interval = setInterval(() => {
      fetchSuppliers();
    }, 100000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchSuppliers]);

  return (
    <div className='content'>
      <NotificationAlert ref={notifyRef} />
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle tag='h4'>Suppliers</CardTitle>
                </Col>
                {[roles.APPROVER].includes(roleId) && (
                  <Col className='text-right'>
                    <Add onChange={fetchSuppliers} notify={handleNotify} />
                  </Col>
                )}
              </Row>
            </CardHeader>
            <CardBody>
              <DataTable
                title='Suppliers'
                columns={columns}
                rows={rows}
                defaultSort={1}
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

export default Suppliers;
