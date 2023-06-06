import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  getCheckFormatByDisbursementId
} from 'api/checkFormat';
import { getDisbursementDetails } from 'api/disbursement';
import computeDisbursement from 'helper/computeDisbursement';
import amountToWords from 'helper/amountToWords';

const Check = () => {
  const { disbursementId } = useParams();
  const [dis, setDis] = useState({});
  const [checkFormat, setCheckFormat] = useState([]);

  useEffect(() => {
    const fetchDisbursement = async () => {
      if (disbursementId) {
        const result = await getDisbursementDetails(disbursementId);
        const computeResult = computeDisbursement(
          result.nonVatableAmount,
          result.vatableAmount,
          result.ewtTaxRate
        );

        setDis({
          ...result,
          amount: computeResult.net.toLocaleString('en', { minimumFractionDigits: 2 }),
          amountInWords: amountToWords(computeResult.net),
          checkDate: result.checkDateOrig
        });
      }
    };
    const fetchCheckFormat = async () => {
      if (disbursementId) {
        const result = await getCheckFormatByDisbursementId(disbursementId);
        setCheckFormat(result);
      }
    };

    fetchDisbursement();
    fetchCheckFormat();
  }, [disbursementId]);
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh'
      }}>
      {checkFormat?.map((format) => {
        const { type, x, y } = format;
        return (
          <div
            key={type}
            style={{
              position: 'absolute',
              top: `${y}px`,
              left: `${x}px`,
              height: '10px'
            }}>
            {dis[type]}
          </div>
        );
      })}
    </div>
  );
};

export default Check;
