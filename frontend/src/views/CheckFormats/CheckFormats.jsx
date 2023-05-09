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
import { getCheckTable } from 'api/checkFormat';

const CheckFormats = () => {
  const [rows, setRows] = useState([]);
  const columns = ['Bank', 'Name', 'Actions'];

  // Modal
  const [itemId, setItemId] = useState();
  const [modalType, setModalType] = useState();
  const [modalState, setModalState] = useState(false);
  const toggleModal = () => {
    fetchCheckFormats();
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

  const fetchCheckFormats = useCallback(async () => {
    let rows = [];
    try {
      rows = await getCheckTable();
    } catch (error) {
      console.error(error);
    }

    const result = rows.map((check) => {
      return [
        check.bankName,
        check.name,
        <>
          <Button
            size='sm'
            color='info'
            title='View'
            className='btn-icon mr-1'
            onClick={() => handleModal('view', check.checkId)}>
            <i className='tim-icons icon-zoom-split'></i>
          </Button>
          <Button
            size='sm'
            color='success'
            title='Edit'
            className='btn-icon mr-1'
            onClick={() => handleModal('update', check.checkId)}>
            <i className='tim-icons icon-pencil'></i>
          </Button>
          <Button
            size='sm'
            color='danger'
            title='Delete'
            className='btn-icon mr-1'
            onClick={() => handleModal('delete', check.checkId)}>
            <i className='tim-icons icon-simple-remove'></i>
          </Button>
        </>
      ];
    });

    setRows(result);
  }, []);

  useEffect(() => {
    fetchCheckFormats();
    const interval = setInterval(() => {
      fetchCheckFormats();
    }, 100000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchCheckFormats]);

  return (
    <div className='content'>
      <NotificationAlert ref={notifyRef} />
      <Card>
        <CardHeader>
          <Row>
            <Col>
              <CardTitle tag='h4'>Check Formats</CardTitle>
            </Col>
            <Col className='text-right'>
              <Add onChange={fetchCheckFormats} notify={handleNotify} />
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <DataTable
            title='Check Format'
            columns={columns}
            rows={rows}
            withAction
          />
        </CardBody>
      </Card>
      {displayModal()}
    </div>
  );
};

export default CheckFormats;
