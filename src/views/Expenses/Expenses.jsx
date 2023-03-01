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
import { sampleAccount } from 'helper/sampleData/sampleAccounts';
import { sampleSupplier } from 'helper/sampleData/sampleSuppliers';
import { sampleVoucher } from 'helper/sampleData/sampleVouchers';
import { sampleEWT } from 'helper/sampleData/sampleEWTs';
import { getBank } from 'helper/sampleData/sampleBanks';

import { getExpenses } from 'api/expense';
import DataTable from 'components/DataTable/DataTable';
import ExpenseStatusPill from 'components/Pills/ExpenseStatusPill';
import categories from 'constants/expenseCategories';
import modeOfPayments from 'constants/modeOfPayments';
import getExpenseStatus from 'helper/expenses/getExpenseStatus';
import numberToCurrency from 'helper/numberToCurrency';

import AddExpense from './actions/AddExpense';
import DeleteExpense from './actions/DeleteExpense';

const Expenses = () => {
  const [rows, setRows] = useState([]);

  // Modal
  const [itemId, setItemId] = useState();
  const [modalType, setModalType] = useState();
  const [modalState, setModalState] = useState(false);
  const toggleModal = () => setModalState(!modalState);
  const handleModal = (type, id = '') => {
    setModalType(type);
    setItemId(id);
    setModalState(true);
  };

  const handleNotify = () => {};

  const columns = [
    'Id',
    'Account',
    'Category',
    'Voucher Code',
    'Voucher Date',
    'Payee',
    'Particulars',
    'Tax Base',
    'VAT',
    'Gross Amount',
    'EWT Code',
    'EWT Rate',
    'EWT Amount',
    'Net Amount',
    'MOP',
    'Bank',
    'Check No.',
    'Check Date',
    'Status',
    'Actions'
  ];

  const fetchExpenses = useCallback(async () => {
    const expenses = await getExpenses();

    const expenseList = expenses.map((expense) => {
      const account = sampleAccount();
      const supplier = sampleSupplier();
      const voucher = sampleVoucher();
      const ewt = sampleEWT();

      const vat = expense.vatableAmount ? expense.nonVatableAmount * 0.12 : 0;
      const gross = vat + expense.nonVatableAmount;
      const ewtAmount = expense.nonVatableAmount * ewt.taxRate / 100;
      const net = gross - ewtAmount;
      return [
        expense.expenseId,
        account.owner,
        categories[expense.category],
        voucher.code,
        voucher.date,
        supplier.name,
        expense.particulars,
        expense.nonVatableAmount,
        vat,
        gross,
        ewt.atc,
        `${ewt.taxRate}%`,
        ewtAmount,
        net,
        modeOfPayments[expense.modeOfPayment],
        `${getBank(account.bankId).abbr} ${account.accountNumber.slice(-4)}`,
        expense.checkNumber,
        expense.checkDate,
        getExpenseStatus(expense.status).title,
        <>
          <Button
            size='sm'
            color='info'
            title='View'
            className='btn-icon mr-1'
            onClick={() => handleModal('view', expense.expenseId)}>
            <i className='tim-icons icon-zoom-split'></i>
          </Button>
          <Button
            size='sm'
            color='success'
            title='Edit'
            className='btn-icon mr-1'
            onClick={() => handleModal('update', expense.expenseId)}>
            <i className='tim-icons icon-pencil'></i>
          </Button>
          <Button
            size='sm'
            color='danger'
            title='Delete'
            className='btn-icon mr-1'
            onClick={() => handleModal('delete', expense.expenseId)}>
            <i className='tim-icons icon-simple-remove'></i>
          </Button>
        </>
      ];
    });

    setRows(expenseList);
  }, []);

  const displayModal = () => {
    if (modalState) {
      switch (modalType) {
        //   case 'view':
        //     return (
        //       <View
        //         roleId={itemId}
        //         toggle={toggleModal}
        //         isOpen={modalState}
        //         notification={handleNotify}
        //       />
        //     );
        // case 'add':
        // 	return (
        //     <Add
        //       toggle={toggleModal}
        //       isOpen={modalState}
        //       notif={handleNotify}
        //     />
        //   );
        // case 'update':
        // 	return <Update id={itemId} toggle={toggleModal} isOpen={modalState} notif={handleNotify} />;
        case 'delete':
          return (
            <DeleteExpense
              expenseId={itemId}
              toggleModal={toggleModal}
              isModalOpen={modalState}
              notify={handleNotify}
            />
          );
        default:
          break;
      }
    }
    return '';
  };

  useEffect(() => {
    fetchExpenses();
    const interval = setInterval(() => {
      fetchExpenses();
    }, 100000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchExpenses]);

  return (
    <div className='content'>
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle tag='h4'>Expenses</CardTitle>
                </Col>
                <Col className='text-right'>
                  <AddExpense />
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <DataTable
                title='Expense'
                columns={columns}
                rows={rows}
                format={{
                  7: (value) => numberToCurrency(value),
                  8: (value) => numberToCurrency(value),
                  9: (value) => numberToCurrency(value),
                  12: (value) => numberToCurrency(value),
                  18: (value) => <ExpenseStatusPill status={value} />,
                }}
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

export default Expenses;
