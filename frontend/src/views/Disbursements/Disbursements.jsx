import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from 'reactstrap';
import NotificationAlert from 'react-notification-alert';

import { getDisbursementTable } from 'api/disbursement';

import expenseCategories from 'constants/expenseCategories';
import nonExpenseCategories from 'constants/nonExpenseCategories';
import checkStatuses from 'constants/checkStatuses';

import numberToCurrency from 'helper/numberToCurrency';

import ActionButtons from 'views/Disbursements/components/ActionButtons';
import TableGrid from 'components/TableGrid/TableGrid';
import DisbursementStatusPill from 'components/Pills/DisbursementStatusPill';

import Add from './actions/Add';
import Update from './actions/Update';
import Delete from './actions/Delete';
import View from './actions/View';
import getDisbursementStatus from 'helper/disbursements/getDisbursementStatus';
import sortDirections from 'constants/sortDirections';
import computeDisbursement from 'helper/computeDisbursement';

const Disbursements = () => {
  const [data, setData] = useState([]);

  // Modal
  const [itemId, setItemId] = useState();
  const [modalType, setModalType] = useState();
  const [modalState, setModalState] = useState(false);
  const toggleModal = () => {
    fetchDisbursements();
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
    { Title: 'Non-Expense Category', accessor: 'nonExpenseCategory' },
    {
      Title: 'Voucher Code',
      accessor: 'voucherCode',
      cellClassName: 'text-nowrap'
    },
    {
      Title: 'Voucher Date',
      accessor: 'voucherDate',
      cellClassName: 'text-nowrap'
    },
    {
      Title: 'Supplier',
      accessor: 'supplierName',
      cellClassName: 'text-nowrap limit-text'
    },
    { Title: 'Month Posting', accessor: 'monthPosting' },
    {
      Title: 'Amount',
      accessor: 'amount',
      cellFormat: numberToCurrency
    },
    { Title: 'VAT', accessor: 'vat', cellFormat: numberToCurrency },
    { Title: 'Gross Amount', accessor: 'gross', cellFormat: numberToCurrency },
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
    { Title: 'Bank Account', accessor: 'bankAccountName' },
    { Title: 'Check No.', accessor: 'checkNumber' },
    {
      Title: 'Check Date',
      accessor: 'checkDate',
      cellClassName: 'text-nowrap'
    },
    {
      Title: 'Cleared Date',
      accessor: 'clearedDate',
      cellClassName: 'text-nowrap'
    },
    {
      Title: 'Status',
      accessor: 'status',
      searchValue: (value) => getDisbursementStatus(value).title,
      cellFormat: (value) => (
        <DisbursementStatusPill status={value} style={{ fontSize: '15px' }} />
      )
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

  const fetchDisbursements = useCallback(async () => {
    let disbursements;
    try {
      disbursements = await getDisbursementTable();
    } catch (error) {
      console.log(error);
    }

    const dataList = disbursements.map((dc) => {
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
    fetchDisbursements();
    const interval = setInterval(() => {
      fetchDisbursements();
    }, 100000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchDisbursements]);

  return (
    <div className='content'>
      <NotificationAlert ref={notifyRef} />
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle tag='h4'>Disbursements</CardTitle>
                </Col>
                <Col className='text-right'>
                  <Add onChange={fetchDisbursements} notify={handleNotify} />
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <TableGrid
                columns={columns}
                data={data}
                defaultSortColumn={'id'}
                defaultSortDirection={sortDirections.desc}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {displayModal()}
    </div>
  );
};

export default Disbursements;
