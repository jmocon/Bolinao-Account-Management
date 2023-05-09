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

import { getExpenseDetails, deleteExpense } from 'api/expense';
import expenseCategories from 'constants/expenseCategories';
import defaultAlert from 'constants/defaultAlert';

const Delete = ({ id, isOpen, toggle, notify }) => {
  const [expense, setExpense] = useState({});

  const [alert, setAlert] = useState(defaultAlert);
  const onDismiss = () => setAlert(defaultAlert);

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchData = async () => {
      let result;
      try {
        result = await getExpenseDetails(id);
      } catch (error) {
        setAlert({
          color: 'danger',
          message: `Error occurred while fetching expense: ${error}`,
          visible: false
        });
      }
      setExpense(result);
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    let result;
    try {
      result = await deleteExpense(id);
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

    notify(
      'success',
      'Successfully deleted expense.',
      'tim-icons icon-check-2'
    );

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>Delete Expense</ModalHeader>
      <ModalBody>
        <Alert color={alert.color} isOpen={alert.visible} toggle={onDismiss}>
          {alert.message}
        </Alert>
        <Row>
          <Col>
            <h3>Delete the expense?</h3>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <Label>Company</Label>
            <span className='form-control'>{expense.companyName}</span>
          </Col>
          <Col md='6'>
            <Label>Expense Category</Label>
            <span className='form-control'>
              {expenseCategories[expense.expenseCategoryId]}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Vatable Amount</Label>
            <span className='form-control'>
              {numberToCurrency(expense.vatableAmount || 0)}
            </span>
          </Col>
          <Col>
            <Label>Non-Vatable Amount</Label>
            <span className='form-control'>
              {numberToCurrency(expense.nonVatableAmount || 0)}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Supplier</Label>
            <span className='form-control'>{expense.supplierName}</span>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='danger' onClick={handleDelete} className='mr-2'>
          Delete
        </Button>
        <Button color='default' onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Delete;
