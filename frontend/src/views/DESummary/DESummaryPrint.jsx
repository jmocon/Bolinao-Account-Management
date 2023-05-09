import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'reactstrap';
import { useParams } from 'react-router-dom';
import NotificationAlert from 'react-notification-alert';

import { getDESummary } from 'api/disbursement';
import numberToCurrency from 'helper/numberToCurrency';
import computeDisbursement from 'helper/computeDisbursement';

import style from './DESummaryPrint.module.css';

const DESummaryPrint = () => {
  const notifyRef = useRef(null);
  const { companyId, month } = useParams();
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result;
      try {
        result = await getDESummary({ companyId, month });
      } catch (error) {
        handleNotify('danger', error, 'tim-icons icon-simple-remove');
        return;
      }

      setSummary(result);
    };

    if (companyId && month) {
      fetchData();
    }
  }, [companyId, month]);

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

  const totals = {
    vatableAmount: 0,
    nonVatableAmount: 0,
    vat: 0,
    gross: 0
  };

  const calculated = summary.map((item) => {
    const { vat, gross } = computeDisbursement(
      item.nonVatableAmount,
      item.vatableAmount
    );

    totals.vatableAmount = totals.vatableAmount + item.vatableAmount;
    totals.nonVatableAmount = totals.nonVatableAmount + item.nonVatableAmount;
    totals.vat = totals.vat + vat;
    totals.gross = totals.gross + gross;

    return { ...item, vat, gross };
  });

  return (
    <Table className={style.Table}>
      <NotificationAlert ref={notifyRef} />
      <thead>
        <tr className='font-weight-bold'>
          <td>Supplier</td>
          <td>Address</td>
          <td>TIN</td>
          <td>Item Code</td>
          <td>Vatable</td>
          <td>Non-Vatable</td>
          <td>Vat</td>
          <td>Gross</td>
        </tr>
      </thead>
      <tbody>
        {calculated.map((row) => {
          return (
            <tr>
              <td>{row.supplierName}</td>
              <td>{row.supplierAddress}</td>
              <td>{row.supplierTIN}</td>
              <td>{row.itemCodeName}</td>
              <td>{numberToCurrency(row.vatableAmount)}</td>
              <td>{numberToCurrency(row.nonVatableAmount)}</td>
              <td>{numberToCurrency(row.vat)}</td>
              <td>{numberToCurrency(row.gross)}</td>
            </tr>
          );
        })}
      </tbody>
      <thead>
        <tr>
          <td colSpan={4}>Total</td>
          <td>{numberToCurrency(totals.vatableAmount)}</td>
          <td>{numberToCurrency(totals.nonVatableAmount)}</td>
          <td>{numberToCurrency(totals.vat)}</td>
          <td>{numberToCurrency(totals.gross)}</td>
        </tr>
      </thead>
    </Table>
  );
};

export default DESummaryPrint;
