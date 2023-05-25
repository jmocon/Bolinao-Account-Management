import React, { useState, useEffect } from 'react';

import { getDepositSlip } from 'api/depositSlip';
import { useLocation, useParams } from 'react-router-dom';
import depositSlipPlaceHolder from 'views/DepositSlipFormat/constant/depositSlipPlaceholder';
import { getDepositSlipFormat } from 'api/depositSlipFormat';
import { modeOfPaymentValues } from 'constants/modeOfPayments';
import numberToDecimal from 'helper/numberToDecimal';

const DepositSlipPrint = () => {
  const { depositSlipId } = useParams();
  const searchParams = useLocation().search;

  const [layout, setLayout] = useState({});
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const cash = ['1000', '500', '200', '100', '50', '20', 'coins'].reduce(
        (agg, curr) => {
          const temp = { ...agg };
          const queryParams = new URLSearchParams(searchParams);
          const value = queryParams.get(curr);
          temp.cashPieces.push(value);
          let product = curr * value;
          if (isNaN(product)) {
            product = value;
          }
          temp.cashAmount.push(product);
          return temp;
        },
        { cashPieces: [], cashAmount: [] }
      );

      let rows = [];
      try {
        rows = await getDepositSlip(depositSlipId);
      } catch (error) {
        console.error(error);
      }

      const { deposits } = rows;

      const formatted = deposits.reduce(
        (agg, curr) => {
          const temp = { ...agg };
          temp.grandTotal = temp.grandTotal + curr.amount;
          temp.accountNumber = curr.bankAccountAccountNumber;
          temp.accountName = curr.bankAccountAccountName;

          if (curr.modeOfPayment === modeOfPaymentValues.Cash) {
            temp.cashTotal = curr.amount;
            return temp;
          }

          temp.checkAmount.push(curr.amount);
          temp.checkNumber.push(curr.checkNumber);
          temp.checkBank.push(curr.bankAbbr);
          temp.checkTotal = temp.checkTotal + curr.amount;
          return temp;
        },
        {
          ...depositSlipPlaceHolder,
          ...cash,
          cashTotal: 0,
          checkTotal: 0,
          grandTotal: 0,
          checkAmount: [],
          checkNumber: [],
          checkBank: [],
          accountNumber: '',
          accountName: ''
        }
      );

      setDetails(formatted);
    };
    fetchData();
  }, [depositSlipId, searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(searchParams);
      const formatId = queryParams.get('depositSlipFormatId');
      const result = await getDepositSlipFormat(formatId);

      const rLayout = result.layout.reduce(
        (agg, curr) => ({ ...agg, [curr.type]: curr }),
        {}
      );

      setLayout(rLayout);
    };
    fetchData();
  }, [searchParams]);

  const currencyFormat = [
    'cashAmount',
    'cashTotal',
    'checkAmount',
    'checkTotal',
    'grandTotal'
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100px',
        height: '50vh'
      }}>
      {Object.entries(layout).map(([key, value]) => {
        const { x, y } = value;
        return (
          <div
            key={`${key}`}
            style={{
              position: 'absolute',
              top: `${y}px`,
              left: `${x}px`,
              width: `${value.width}px` || '200px',
              fontSize: value.fontSize && `${value.fontSize}px`,
              letterSpacing: value.letterSpacing && `${value.letterSpacing}px`,
              height: value.fontSize ? `${value.fontSize * 1.5}px` : '10px',
              whiteSpace: 'nowrap'
            }}>
            {typeof details[key] === typeof [] ? (
              <ul style={{ padding: '0px' }}>
                {details[key].map((ph, i) => (
                  <li
                    key={`${key}-${i}-${ph}`}
                    style={{
                      marginBottom: value?.margin && `${value?.margin}px`,
                      listStyleType: 'none'
                    }}>
                    {currencyFormat.includes(key) ? numberToDecimal(ph) : ph}
                  </li>
                ))}
              </ul>
            ) : currencyFormat.includes(key) ? (
              numberToDecimal(details[key])
            ) : (
              details[key]
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DepositSlipPrint;
