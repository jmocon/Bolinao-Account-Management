import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Label
} from 'reactstrap';

import DataTable from 'components/DataTable/DataTable';
import { getDepositSlip } from 'api/depositSlip';

import numberToCurrency from 'helper/numberToCurrency';
import Print from '../components/Print';

const View = ({ id, isOpen, toggle, notify }) => {
  const [deposits, setDeposits] = useState([]);
  const [depositSlip, setDepositSlip] = useState({});
  const columns = [
    'Deposit Id',
    'Bank Account',
    'Payee',
    'Deposit Date',
    'Bank',
    'Amount'
  ];
  // Notification
  const [alert, setAlert] = useState({
    color: 'primary',
    message: '',
    visible: false
  });
  const onDismiss = () =>
    setAlert({
      color: 'primary',
      message: '',
      visible: false
    });

  useEffect(() => {
    const fetchDeposit = async () => {
      if (id) {
        const result = await getDepositSlip(id);
        setDepositSlip(result.depositSlip);
        setDeposits(result.deposits);
      }
    };
    fetchDeposit();
  }, [id]);

  const formattedTable = () => {
    return deposits.map((deposit) => [
      `D${String(deposit.depositId).padStart(5, '0')}`,
      deposit.bankAccountName,
      deposit.payee,
      deposit.depositDate,
      deposit.bankName,
      deposit.amount
    ]);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>View Deposit Slip</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row className='mb-2'>
          <Col md={4}>
            <Label>Deposit Slip Id</Label>
            <span className='form-control'>{depositSlip.depositSlipCode}</span>
          </Col>
          <Col md={4}>
            <Label>Date Created</Label>
            <span className='form-control'>{depositSlip.dateCreated}</span>
          </Col>
          <Col md={4}>
            <Label>Date Printed</Label>
            <span className='form-control'>{depositSlip.datePrinted}</span>
          </Col>
        </Row>

        <Row>
          <Col>
            <DataTable
              title='Deposit Slips'
              columns={columns}
              rows={formattedTable()}
              format={{ 5: (value) => numberToCurrency(value) }}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Print depositSlipId={id} notify={notify} />
        <Button color='default' onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default View;
