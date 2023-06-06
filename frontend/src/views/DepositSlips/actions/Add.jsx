import React, { useState, useCallback, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from 'reactstrap';

import { getOpenDeposits } from 'api/deposit';
import numberToCurrency from 'helper/numberToCurrency';
import DataTable from 'components/DataTable/DataTable';
import { addDepositSlip } from 'api/depositSlip';
import modeOfPayments, { modeOfPaymentValues } from 'constants/modeOfPayments';
import defaultAlert from 'constants/defaultAlert';

const Add = ({ onChange, notify }) => {
  const [alert, setAlert] = useState(defaultAlert);
  const onDismiss = () => setAlert(defaultAlert);
  const alertDanger = (message) =>
    setAlert({ color: 'danger', message, visible: true });

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
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    onDismiss();
    setSelected([]);
    setIsOpen((currState) => !currState);
  };
  const toggleModal = () => {
    if (selected.length !== 0) {
      const response = window.confirm(
        'There have been changes made. Are you sure you want to close the window?'
      );

      if (!response) {
        return;
      }
    }
    closeModal();
  };

  useEffect(() => {
    const data = deposits.filter(
      (deposit) => !selected.includes(deposit.depositId)
    );
    setRows(data);
  }, [deposits, selected]);

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
  }, [fetchDeposits, isOpen]);

  const handleAdd = async () => {
    // Checking
    const selectedDeposit = deposits.filter((deposit) =>
      selected.includes(deposit.depositId)
    );
    if (selected.length <= 0) {
      setAlert({
        color: 'danger',
        message: 'Select at least one deposit.',
        visible: true
      });
      return;
    }
    const checkCount = selectedDeposit.filter(
      (deposit) => deposit.modeOfPayment === modeOfPaymentValues.Check
    );

    if (checkCount >= 9) {
      setAlert({
        color: 'danger',
        message: 'Up to 9 checks only.',
        visible: true
      });
      return;
    }

    let result;
    try {
      result = await addDepositSlip(selected);
    } catch (error) {
      setAlert({
        color: 'danger',
        message: error,
        visible: true
      });
      return;
    }

    if (!result.success) {
      setAlert({
        color: 'danger',
        message: result.message,
        visible: true
      });
      return;
    }

    onChange();
    notify(
      'success',
      'Successfully added deposit slip.',
      'tim-icons icon-check-2'
    );
    closeModal();
  };

  const handleSelect = (id) => {
    setSelected((prev) => [...prev, id]);
  };

  const handleRemove = (id) => {
    setSelected((prev) => prev.filter((item) => item !== id));
  };

  const selectedTable = () =>
    deposits
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
    <>
      <Button
        color='info'
        size='sm'
        title='Add'
        onClick={toggleModal}
        className='animation-on-hover'>
        <i className='fa fa-plus'></i> New Deposit Slip
      </Button>
      <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
        <ModalHeader toggle={toggleModal}>Add Deposit Slip</ModalHeader>
        <ModalBody>
          <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
            {alert.message}
          </Alert>
          <Row>
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
          <Button color='info' onClick={handleAdd} className='mr-2'>
            Add
          </Button>
          <Button color='default' onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Add;
