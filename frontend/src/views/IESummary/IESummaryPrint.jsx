import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'reactstrap';
import { useParams } from 'react-router-dom';
import NotificationAlert from 'react-notification-alert';

import { getIESummary } from 'api/disbursement';
import numberToCurrency from 'helper/numberToCurrency';
import computeDisbursement from 'helper/computeDisbursement';

import style from './IESummaryPrint.module.css';

const IESummaryPrint = () => {
  const notifyRef = useRef(null);
  const { companyId, month } = useParams();
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result;
      try {
        result = await getIESummary({ companyId, month });
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

  let totalNet = 0;

  const calculated = summary.map((item) => {
    const { net } = computeDisbursement(
      item.nonVatableAmount,
      item.vatableAmount,
      item.ewtRate
    );

    totalNet = totalNet + net;

    return { ...item, net };
  });

  return (
    <Table className={style.Table}>
      <NotificationAlert ref={notifyRef} />
      <thead>
        <tr className='font-weight-bold'>
          <td>Item Code</td>
          <td>Particulars</td>
          <td>Net Amount</td>
        </tr>
      </thead>
      <tbody>
        {calculated.map((row) => (
          <tr>
            <td>{row.itemCodeName}</td>
            <td>{row.particulars}</td>
            <td>{numberToCurrency(row.net)}</td>
          </tr>
        ))}
      </tbody>
      <thead>
        <tr>
          <td colSpan={2}>Total</td>
          <td>{numberToCurrency(totalNet)}</td>
        </tr>
      </thead>
    </Table>
  );
};

export default IESummaryPrint;
