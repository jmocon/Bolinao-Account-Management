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
import { getItemCodes } from 'api/itemCode';

const ItemCodes = () => {
  const [rows, setRows] = useState([]);
  const columns = ['ItemCode Id', 'Name', 'Actions'];

  // Modal
  const [itemId, setItemId] = useState();
  const [modalType, setModalType] = useState();
  const [modalState, setModalState] = useState(false);
  const toggleModal = () => {
    fetchItemCodes();
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

  const fetchItemCodes = useCallback(async () => {
    let rows = [];
    try {
      rows = await getItemCodes();
    } catch (error) {
      handleNotify('danger', error.message, 'tim-icons icon-simple-remove');
    }

    const result = rows.map((itemCode) => {
      return [
        itemCode.itemCodeId,
        itemCode.name,
        <>
          <Button
            size='sm'
            color='info'
            title='View'
            className='btn-icon mr-1'
            onClick={() => handleModal('view', itemCode.itemCodeId)}>
            <i className='tim-icons icon-zoom-split'></i>
          </Button>
          <Button
            size='sm'
            color='success'
            title='Edit'
            className='btn-icon mr-1'
            onClick={() => handleModal('update', itemCode.itemCodeId)}>
            <i className='tim-icons icon-pencil'></i>
          </Button>
          <Button
            size='sm'
            color='danger'
            title='Delete'
            className='btn-icon mr-1'
            onClick={() => handleModal('delete', itemCode.itemCodeId)}>
            <i className='tim-icons icon-simple-remove'></i>
          </Button>
        </>
      ];
    });

    setRows(result);
  }, []);

  useEffect(() => {
    fetchItemCodes();
    const interval = setInterval(() => {
      fetchItemCodes();
    }, 100000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchItemCodes]);

  return (
    <div className='content'>
      <NotificationAlert ref={notifyRef} />
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle tag='h4'>Item Codes</CardTitle>
                </Col>
                <Col className='text-right'>
                  <Add onChange={fetchItemCodes} notify={handleNotify} />
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <DataTable
                title='ItemCode'
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

export default ItemCodes;
