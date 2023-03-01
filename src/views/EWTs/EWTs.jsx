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

// Sample Data
import { getEWTs } from 'api/ewt';

import DataTable from 'components/DataTable/DataTable';

// Actions
import Add from './actions/Add';
import View from './actions/View';
import Update from './actions/Update';
import Delete from './actions/Delete';

const EWTs = () => {
  // DataTable
  const [rows, setRows] = useState([]);
  const columns = ['Tax Type', 'Description', 'Tax Rate', 'ATC', 'Actions'];

  const handleNotify = () => {};

  // Modal
  const [itemId, setItemId] = useState();
  const [modalType, setModalType] = useState();
  const [modalState, setModalState] = useState(false);
  const toggleModal = () => {
    fetchEWTs();
    setModalState(!modalState);
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
              ewtId={itemId}
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
              ewtId={itemId}
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

  const fetchEWTs = useCallback(async () => {
    const rows = await getEWTs();
    const ewtList = rows.map((ewt) => [
      ewt.taxType,
      ewt.description,
      `${ewt.taxRate} %`,
      ewt.atc,
      <>
        <Button
          size='sm'
          color='info'
          title='View'
          className='btn-icon mr-1'
          onClick={() => handleModal('view', ewt.ewtId)}>
          <i className='tim-icons icon-zoom-split'></i>
        </Button>
        <Button
          size='sm'
          color='success'
          title='Edit'
          className='btn-icon mr-1'
          onClick={() => handleModal('update', ewt.ewtId)}>
          <i className='tim-icons icon-pencil'></i>
        </Button>
        <Button
          size='sm'
          color='danger'
          title='Delete'
          className='btn-icon mr-1'
          onClick={() => handleModal('delete', ewt.ewtId)}>
          <i className='tim-icons icon-simple-remove'></i>
        </Button>
      </>
    ]);

    setRows(ewtList);
  }, []);

  useEffect(() => {
    fetchEWTs();
    const interval = setInterval(() => {
      fetchEWTs();
    }, 100000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchEWTs]);

  return (
    <div className='content'>
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle tag='h4'>Expanded Withholding Tax</CardTitle>
                </Col>
                <Col className='text-right'>
                  <Add onChange={fetchEWTs} />
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <DataTable
                title='EWT'
                columns={columns}
                rows={rows}
                withAction
                cellClass={{ 1: 'text-wrap', 2: 'text-center' }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {displayModal()}
    </div>
  );
};

export default EWTs;
