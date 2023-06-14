import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Alert
} from 'reactstrap';

import numberToCurrency from 'helper/numberToCurrency';

import { getDisbursementDetails, deleteDisbursement } from 'api/disbursement';
import expenseCategories from 'constants/expenseCategories';
import nonExpenseCategories from 'constants/nonExpenseCategories';

const Delete = ({ id, isOpen, toggle, notify }) => {
  const [disbursement, setDisbursement] = useState({});

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
    if (!id) {
      return;
    }
    const fetchData = async () => {
      let result;
      try {
        result = await getDisbursementDetails(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error occurred while fetching disbursement: ${error}`,
          visible: false
        });
      }
      setDisbursement(result);
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    let result;
    try {
      result = await deleteDisbursement(id);
    } catch (error) {
      setAlert({
        color: 'danger',
        message: error.message,
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

    notify('success', 'Successfully deleted bank.', 'tim-icons icon-check-2');

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>Delete Disbursement</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row>
          <Col>
            <h3>Delete the disbursement?</h3>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <Label>Company</Label>
            <span className='form-control'>{disbursement.companyName}</span>
          </Col>
          <Col md='3'>
            <Label>Expense Category</Label>
            <span className='form-control'>
              {expenseCategories[disbursement.expenseCategory]}
            </span>
          </Col>
          <Col md='3'>
            <Label>Non-Expense Category</Label>
            <span className='form-control'>
              {nonExpenseCategories[disbursement.nonExpenseCategory]}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Vatable Amount</Label>
            <span className='form-control'>
              {numberToCurrency(disbursement.vatableAmount || 0)}
            </span>
          </Col>
          <Col>
            <Label>Non-Vatable Amount</Label>
            <span className='form-control'>
              {numberToCurrency(disbursement.nonVatableAmount || 0)}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Supplier</Label>
            <span className='form-control'>{disbursement.supplierName}</span>
          </Col>
          <Col>
            <Label>Check Payee</Label>
            <span className='form-control'>{disbursement.checkPayee}</span>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='danger' onClick={handleDelete} className='mr-2'>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Delete;
