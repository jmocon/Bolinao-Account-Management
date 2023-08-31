import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from 'reactstrap';
import NotificationAlert from 'react-notification-alert';

import expenseCategories from 'constants/expenseCategories';
import nonExpenseCategories from 'constants/nonExpenseCategories';
import checkStatuses from 'constants/checkStatuses';

import numberToCurrency from 'helper/numberToCurrency';

import ActionButtons from 'views/Disbursements/components/ActionButtons';
import TableGrid from 'components/TableGrid/TableGrid';

import Add from './actions/Add';
import Update from './actions/Update';
import Delete from './actions/Delete';
import View from './actions/View';
import sortDirections from 'constants/sortDirections';
import computeDisbursement from 'helper/computeDisbursement';
import { getExpenseTable } from 'api/expense';
import ExpenseStatusPill from 'components/Pills/ExpenseStatusPill';
import getExpenseStatus from 'helper/expenses/getExpenseStatus';

const Expenses = () => {
  const [data, setData] = useState([]);

  // Modal
  const [itemId, setItemId] = useState();
  const [modalType, setModalType] = useState();
  const [modalState, setModalState] = useState(false);
  const toggleModal = () => {
    fetchData();
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

  const columns = [
    { Title: 'Id', accessor: 'id' },
    { Title: 'Company', accessor: 'companyCode', cellClassName: 'text-nowrap' },
    { Title: 'Expense Category', accessor: 'expenseCategory' },
    { Title: 'Item Code', accessor: 'itemCode' },
    { Title: 'Particulars', accessor: 'particulars' },
    { Title: 'Invoice Date', accessor: 'invoiceDate' },
    { Title: 'Invoice Number', accessor: 'invoiceNumber' },
    { Title: 'Supplier Name', accessor: 'supplierName' },
    { Title: 'Supplier TIN', accessor: 'supplierTin' },
    { Title: 'Supplier Address', accessor: 'supplierAddress' },
    {
      Title: 'Vatable Amount',
      accessor: 'vatableAmount',
      cellFormat: numberToCurrency
    },
    { Title: 'VAT', accessor: 'vat', cellFormat: numberToCurrency },
    {
      Title: 'Non-Vatable Amount',
      accessor: 'nonVatableAmount',
      cellFormat: numberToCurrency
    },
    { Title: 'Gross Amount', accessor: 'gross', cellFormat: numberToCurrency },
    { Title: 'EWT Code', accessor: 'ewtCode' },
    { Title: 'EWT Rate', accessor: 'ewtRate', cellClassName: 'text-nowrap' },
    {
      Title: 'EWT Amount',
      accessor: 'ewt',
      cellFormat: numberToCurrency
    },
    {
      Title: 'Net Amount',
      accessor: 'net',
      cellFormat: numberToCurrency
    },
    {
      Title: 'Mode of Payment',
      accessor: 'modeOfPayment',
      cellClassName: 'text-nowrap'
    },
    { Title: 'Remarks', accessor: 'remarks' },
    {
      Title: 'Status',
      accessor: 'status',
      searchValue: (value) => getExpenseStatus(value).title,
      cellFormat: (value) => <ExpenseStatusPill status={value} />
    },
    {
      Title: 'Actions',
      accessor: 'actionValue',
      cellFormat: (value) => (
        <ActionButtons
          id={value.id}
          status={value.status}
          handleModal={handleModal}
        />
      ),
      cellClassName: 'text-nowrap',
      isFilterable: false,
      isSortable: false
    }
  ];

  const fetchData = useCallback(async () => {
    let data;
    try {
      data = await getExpenseTable();
    } catch (error) {
      console.log(error);
    }

    const dataList = data.map((dc) => {
      const { nonVatable, vatable, vat, gross, ewt, net } = computeDisbursement(
        dc.nonVatableAmount,
        dc.vatableAmount,
        dc.ewtRate
      );

      return {
        ...dc,
        expenseCategory: expenseCategories[dc.expenseCategory],
        nonExpenseCategory: nonExpenseCategories[dc.nonExpenseCategory],
        amount: vatable + nonVatable,
        vat,
        gross,
        ewtRate: `${dc.ewtRate || 0} %`,
        ewt,
        net,
        checkStatus: checkStatuses[dc.checkStatus],
        actionValue: { id: dc.id, status: dc.status }
      };
    });

    setData(dataList);
  }, []);

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

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 100000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchData]);

  return (
    <div className='content'>
      <NotificationAlert ref={notifyRef} />
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle tag='h4'>Manual Expenses</CardTitle>
                </Col>
                <Col className='text-right'>
                  <Add onChange={fetchData} notify={handleNotify} />
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <TableGrid
                columns={columns}
                data={data}
                defaultSortColumn={'id'}
                defaultSortDirection={sortDirections.asc}
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
