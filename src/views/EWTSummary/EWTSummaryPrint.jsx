import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'reactstrap';
import { useParams } from 'react-router-dom';
import NotificationAlert from 'react-notification-alert';

import { getEWTSummary } from 'api/disbursement';
import numberToCurrency from 'helper/numberToCurrency';

import style from './EWTSummaryPrint.module.css';
import computeDisbursement from 'helper/computeDisbursement';

const EWTSummaryPrint = () => {
  const notifyRef = useRef(null);
  const { companyId, month } = useParams();
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result;
      try {
        result = await getEWTSummary({ companyId, month });
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

  let totalEWT = 0;

  const calculated = summary.map((item) => {
    const { ewt } = computeDisbursement(0, item.vatableAmount, item.ewtRate);

    totalEWT = ewt;

    return { ...item, ewt };
  });

  return (
    <Table className={style.Table}>
      <NotificationAlert ref={notifyRef} />
      <thead>
        <tr className='font-weight-bold'>
          <td>Payee</td>
          <td>Particulars</td>
          <td>EWT Amount</td>
        </tr>
      </thead>
      <tbody>
        {calculated.map((row) => {
          return (
            <tr>
              <td>{row.supplierName}</td>
              <td>{row.particulars}</td>
              <td>{numberToCurrency(row.ewt)}</td>
            </tr>
          );
        })}
      </tbody>
      <thead>
        <tr>
          <td>Total</td>
          <td></td>
          <td>{numberToCurrency(totalEWT)}</td>
        </tr>
      </thead>
    </Table>
  );
};

export default EWTSummaryPrint;
