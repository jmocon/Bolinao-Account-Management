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

import numberToCurrency from 'helper/numberToCurrency';
import modeOfPayments from 'constants/modeOfPayments';
import DataTable from 'components/DataTable/DataTable';

import Add from './actions/Add';
import View from './actions/View';
import Update from './actions/Update';
import Delete from './actions/Delete';
import { getDepositTable } from 'api/deposit';

const Deposits = () => {
  const [rows, setRows] = useState([]);
  const columns = [
    'Deposit Id',
    'Bank Account',
    'Payee',
    'Particular',
    'Deposit Date',
    'Bank',
    'Mode of Payment',
    'Amount',
    'Check Number',
    'Check Date',
    'Cleared Date',
    'Actions'
  ];

  // Modal
  const [itemId, setItemId] = useState();
  const [modalType, setModalType] = useState();
  const [modalState, setModalState] = useState(false);
  const toggleModal = () => {
    fetchDeposits();
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

  const fetchDeposits = useCallback(async () => {
    let rows = [];
    try {
      rows = await getDepositTable();
    } catch (error) {
      console.error(error);
    }

    const result = rows.map((deposit) => {
      return [
        `D${String(deposit.depositId).padStart(5, '0')}`,
        deposit.bankAccountName,
        deposit.payee,
        deposit.particular,
        deposit.depositDate,
        deposit.bankName,
        modeOfPayments[deposit.modeOfPayment],
        deposit.amount,
        deposit.checkNumber,
        deposit.checkDate,
        deposit.clearedDate,
        <>
          <Button
            size='sm'
            color='info'
            title='View'
            className='btn-icon mr-1'
            onClick={() => handleModal('view', deposit.depositId)}>
            <i className='tim-icons icon-zoom-split'></i>
          </Button>
          <Button
            size='sm'
            color='success'
            title='Edit'
            className='btn-icon mr-1'
            onClick={() => handleModal('update', deposit.depositId)}>
            <i className='tim-icons icon-pencil'></i>
          </Button>
          <Button
            size='sm'
            color='danger'
            title='Delete'
            className='btn-icon mr-1'
            onClick={() => handleModal('delete', deposit.depositId)}>
            <i className='tim-icons icon-simple-remove'></i>
          </Button>
        </>
      ];
    });

    setRows(result);
  }, []);

  useEffect(() => {
    fetchDeposits();
    const interval = setInterval(() => {
      fetchDeposits();
    }, 100000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchDeposits]);

  return (
    <div className='content'>
      <NotificationAlert ref={notifyRef} />
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle tag='h4'>Deposits</CardTitle>
                </Col>
                <Col className='text-right'>
                  <Add onChange={fetchDeposits} notify={handleNotify} />
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <DataTable
                title='Deposit'
                columns={columns}
                rows={rows}
                format={{
                  7: (value) => numberToCurrency(value)
                }}
                defaultSortDirection
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

export default Deposits;
