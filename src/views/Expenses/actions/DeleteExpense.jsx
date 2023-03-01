import React, { useState, useEffect } from 'react';
// reactstrap components
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

import { getExpense } from 'api/expense';

const Delete = ({ expenseId, toggleModal, isModalOpen, notify }) => {
  const [expense, setExpense] = useState({});
  // Notification
  const [notif, setNotif] = useState({
    color: 'primary',
    message: '',
    visible: false
  });
  const onDismiss = () =>
    setNotif({
      color: 'primary',
      message: '',
      visible: false
    });

  useEffect(() => {
    const fetchData = async () => {
      const expenseData = await getExpense(expenseId);
      setExpense(expenseData);
    };

    fetchData().catch();
  }, [expenseId]);

  const handleDelete = () => {
    // var data = {
    //   Function: 'delete',
    //   User_Id: props.id
    // };
    // axios
    //   .post('/User.php', data)
    //   .then((response) => {
    //     if (response.data.Success) {
    //       props.notif('success', 'Successfully deleted user.');
    //       props.toggle();
    //     } else {
    //       handleNotif('danger', 'Error', response.data.Message);
    //     }
    //   })
    //   .catch(() => handleNotif('danger', 'Error', 'Connection Error'));
  };

  return (
    <Modal isOpen={isModalOpen} toggle={toggleModal} size='lg'>
      <ModalHeader toggle={toggleModal}>Delete User</ModalHeader>
      <ModalBody>
        <Alert color={notif.color} isOpen={notif.visible} toggle={onDismiss}>
          {notif.message}
        </Alert>
        <Row>
          <Col>
            <h3>Delete the expense?</h3>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <Label>Account</Label>
            <span className='form-control'>{expense.accountId}</span>
          </Col>
          <Col md='6'>
            <Label>Category</Label>
            <span className='form-control'>{expense.category}</span>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <Label>Amount</Label>
            <span className='form-control'>{numberToCurrency(expense.nonVatableAmount || 0)}</span>
          </Col>
          <Col md='6'>
            <Label>Payee</Label>
            <span className='form-control'>{expense.supplierId}</span>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className='p-4 justify-content-end'>
        <Button color='danger' onClick={handleDelete} className='mr-2'>
          Delete
        </Button>
        <Button color='default' onClick={toggleModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Delete;
