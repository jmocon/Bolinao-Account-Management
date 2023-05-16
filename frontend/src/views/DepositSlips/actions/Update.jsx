import React, { useState, useEffect, useCallback } from 'react';
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

import { getOpenDeposits } from 'api/deposit';
import modeOfPayments, { modeOfPaymentValues } from 'constants/modeOfPayments';
import defaultAlert from 'constants/defaultAlert';
import { getDepositSlip, updateDepositSlip } from 'api/depositSlip';
import DataTable from 'components/DataTable/DataTable';
import numberToCurrency from 'helper/numberToCurrency';

const Update = ({ id, isOpen, toggle, notify }) => {
  const [alert, setAlert] = useState(defaultAlert);
  const onDismiss = () => setAlert(defaultAlert);
  const alertDanger = (message) =>
    setAlert({ color: 'danger', message, visible: true });

  const [isDirty, setIsDirty] = useState(false);

  const [depositSlip, setDepositSlip] = useState({});
  const [prevDeposits, setPrevDeposits] = useState([]);
  const [selected, setSelected] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [rows, setRows] = useState([]);
  const columns = [
    'Deposit Id',
    'Bank Account',
    'Payee',
    'Deposit Date',
    'Mode Of Payment',
    'Bank',
    'Amount',
    'Actions'
  ];

  const toggleModal = () => {
    if (isDirty) {
      const response = window.confirm(
        'There have been changes made. Are you sure you want to close the window?'
      );

      if (!response) {
        return;
      }
    }
    onDismiss();
    toggle();
  };

  useEffect(() => {
    const data = [
      ...deposits,
      ...prevDeposits.map((d) => ({ ...d, depositId: d.id }))
    ].filter((deposit) => !selected.includes(deposit.depositId));
    setRows(data);
  }, [deposits, prevDeposits, selected]);

  const fetchDeposits = useCallback(async () => {
    let result = [];
    try {
      result = await getOpenDeposits();
    } catch (error) {
      alertDanger(error);
    }

    setDeposits(result);
  }, [setDeposits]);

  useEffect(() => {
    fetchDeposits();
    const interval = setInterval(() => {
      fetchDeposits();
    }, 100000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchDeposits]);

  useEffect(() => {
    const fetchDeposit = async () => {
      if (id) {
        const result = await getDepositSlip(id);
        setDepositSlip(result.depositSlip);
        setSelected(result.deposits.map((d) => d.id));
        setPrevDeposits(result.deposits);
      }
    };
    fetchDeposit();
  }, [id]);

  const handleUpdate = async () => {
    const selectedDeposit = [
      ...deposits,
      ...prevDeposits.map((d) => ({ ...d, depositSlip: d.id }))
    ].filter((deposit) => selected.includes(deposit.depositId));
    if (selected.length <= 0) {
      alertDanger('Select at least one deposit.');
      return;
    }
    const checkCount = selectedDeposit.filter(
      (deposit) => deposit.modeOfPayment === modeOfPaymentValues.Check
    );

    if (checkCount >= 9) {
      alertDanger('Up to 9 checks only.');
      return;
    }

    let result;
    try {
      result = await updateDepositSlip(id, selected);
    } catch (error) {
      alertDanger(`Error occurred while updating deposit slip ${error}`);
      return;
    }

    if (!result.success) {
      alertDanger(result.message);
      return;
    }

    notify(
      'success',
      'Successfully added deposit slip.',
      'tim-icons icon-check-2'
    );
    toggle();
  };

  const handleSelect = (id) => {
    setIsDirty(true);
    setSelected((prev) => [...prev, id]);
  };

  const handleRemove = (id) => {
    setIsDirty(true);
    setSelected((prev) => prev.filter((item) => item !== id));
  };

  const selectedTable = () =>
    [...deposits, ...prevDeposits.map((d) => ({ ...d, depositId: d.id }))]
      .filter((deposit) => selected.includes(deposit.depositId))
      .map((deposit) => [
        `D${String(deposit.depositId).padStart(5, '0')}`,
        deposit.bankAccountName,
        deposit.payee,
        deposit.depositDate,
        modeOfPayments[deposit.modeOfPayment],
        deposit.bankName,
        deposit.amount,
        <Button
          size='sm'
          color='danger'
          title='View'
          className='btn-icon mr-1'
          onClick={() => handleRemove(deposit.depositId)}>
          <i className='tim-icons icon-simple-remove'></i>
        </Button>
      ]);

  const toAddTable = (value) =>
    value.map((deposit) => [
      `D${String(deposit.depositId).padStart(5, '0')}`,
      deposit.bankAccountName,
      deposit.payee,
      deposit.depositDate,
      modeOfPayments[deposit.modeOfPayment],
      deposit.bankName,
      deposit.amount,
      <Button
        size='sm'
        color='info'
        title='View'
        className='btn-icon mr-1'
        onClick={() => handleSelect(deposit.depositId)}>
        <i className='tim-icons icon-simple-add'></i>
      </Button>
    ]);

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
      <ModalHeader toggle={toggleModal}>Update Deposit</ModalHeader>
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
        <Row className='mt-3'>
          <Col>
            <h1>Selected</h1>
            <DataTable
              title='Deposit'
              columns={columns}
              rows={selectedTable()}
              format={{ 6: (value) => numberToCurrency(value) }}
              withAction
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
            <h1>Deposits</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable
              title='Deposit'
              columns={columns}
              rows={toAddTable(rows)}
              format={{ 6: (value) => numberToCurrency(value) }}
              withAction
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='info' onClick={handleUpdate} className='mr-2'>
          Update
        </Button>
        <Button color='default' onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Update;
