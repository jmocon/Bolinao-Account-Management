import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVoucherDetail } from 'api/voucher';

import style from './Voucher.module.css';
import computeDisbursement from 'helper/computeDisbursement';
import amountToWords from 'helper/amountToWords';

const Voucher = () => {
  const { voucherId } = useParams();
  const [voucher, setVoucher] = useState({});
  const [ewtAmount, setEwtAmount] = useState(0);
  const [net, setNet] = useState(0);
  const [amountInWords, setAmountInWords] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!voucherId) {
        return;
      }
      let result;
      try {
        result = await getVoucherDetail(voucherId);
      } catch (error) {
        console.log(error);
      }

      const computeResult = computeDisbursement(
        result.nonVatableAmount,
        result.vatableAmount,
        result.ewtTaxRate
      );

      setEwtAmount(computeResult.ewt);
      setNet(computeResult.net);
      setVoucher(result);

      setAmountInWords(amountToWords(computeResult.net));
    };
    fetchData();
  }, [voucherId]);

  return (
    <div className='p-4'>
      <div className={style.Wrapper}>
        <table width={800} className='mb-2'>
          <tbody>
            <tr>
              <td rowSpan={2} className='text-center'>
                LOGO
              </td>
              <td
                className='text-center font-weight-bold'
                style={{ width: '220px' }}>
                CHECK VOUCHER
              </td>
            </tr>
            <tr>
              <td className='text-center bg-light'>{voucher.voucherCode}</td>
            </tr>
          </tbody>
        </table>

        <table width={800} className='mb-4'>
          <tbody>
            <tr>
              <td style={{ width: '50px' }} className='font-weight-bold'>
                PAYEE:
              </td>
              <td
                style={{ width: '550px' }}
                className='border-bottom border-dark'>
                {voucher.checkPayee}
              </td>
              <td style={{ width: '50px' }} className='font-weight-bold'>
                DATE:
              </td>
              <td
                style={{ width: '150px' }}
                className='border-bottom border-dark'>
                {voucher.voucherDate}
              </td>
            </tr>
          </tbody>
        </table>

        <table width={800} className='border border-dark mb-2'>
          <tbody>
            <tr>
              <td
                className='border border-dark p-2 text-center'
                style={{ width: '550px' }}
                colSpan={3}>
                PARTICULARS
              </td>
              <td
                className='border border-dark p-2 text-center'
                style={{ width: '250px' }}>
                AMOUNT
              </td>
            </tr>
            <tr>
              <td className='border border-dark p-2 text-center' colSpan={3}>
                {voucher.particulars}
              </td>
              <td className='border border-dark p-2 text-center' rowSpan={2}>
                {net.toLocaleString('en', { minimumFractionDigits: 2 })}
              </td>
            </tr>
            <tr>
              <td className='border border-dark p-2 text-center'>
                {voucher.monthPosting}
              </td>
              <td className='border border-dark p-2 text-center'>
                {voucher.itemCodeName}
              </td>
              <td className='border border-dark p-2 text-center'>
                EWT: {ewtAmount}
              </td>
            </tr>
          </tbody>
        </table>
        <table width={800} className='mb-2'>
          <tbody>
            <tr>
              <td className='text-center'>
                Received from {voucher.companyName} the sum of{' '}
                <u className='text-uppercase'>{amountInWords}</u> as payment of
                the above account
              </td>
            </tr>
          </tbody>
        </table>
        <table width={800} className='mb-2'>
          <tbody>
            <tr>
              <td className='font-weight-bold'>BANK:</td>
              <td>{voucher.bankAccountName}</td>
              <td className='font-weight-bold'>Received Payment By:</td>
            </tr>
            <tr>
              <td className='font-weight-bold'>DATE:</td>
              <td>{voucher.checkDate}</td>
              <td rowSpan={2} className='border-bottom border-dark'></td>
            </tr>
            <tr>
              <td className='font-weight-bold'>CHECK NO.</td>
              <td>{voucher.checkNumber}</td>
            </tr>
          </tbody>
        </table>
        <table width={800} className='mb-2'>
          <tbody>
            <tr style={{ height: '100px' }}>
              <td className={style.BorderDotted}>Prepared By:</td>
              <td className={style.BorderDotted}>Certified Correct By:</td>
              <td className={style.BorderDotted}>Approved By:</td>
            </tr>
          </tbody>
        </table>
        <table width={800}>
          <tbody>
            <tr>
              <td className='text-center text-info h1'> --- ORIGINAL ---</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={style.Wrapper}>
        <table width={800} className='mb-2'>
          <tbody>
            <tr>
              <td rowSpan={2} className='text-center'>
                LOGO
              </td>
              <td
                className='text-center font-weight-bold'
                style={{ width: '220px' }}>
                CHECK VOUCHER
              </td>
            </tr>
            <tr>
              <td className='text-center bg-light'>{voucher.voucherCode}</td>
            </tr>
          </tbody>
        </table>

        <table width={800} className='mb-4'>
          <tbody>
            <tr>
              <td style={{ width: '50px' }} className='font-weight-bold'>
                PAYEE:
              </td>
              <td
                style={{ width: '550px' }}
                className='border-bottom border-dark'>
                {voucher.checkPayee}
              </td>
              <td style={{ width: '50px' }} className='font-weight-bold'>
                DATE:
              </td>
              <td
                style={{ width: '150px' }}
                className='border-bottom border-dark'>
                {voucher.voucherDate}
              </td>
            </tr>
          </tbody>
        </table>

        <table width={800} className='border border-dark mb-2'>
          <tbody>
            <tr>
              <td
                className='border border-dark p-2 text-center'
                style={{ width: '550px' }}
                colSpan={3}>
                PARTICULARS
              </td>
              <td
                className='border border-dark p-2 text-center'
                style={{ width: '250px' }}>
                AMOUNT
              </td>
            </tr>
            <tr>
              <td className='border border-dark p-2 text-center' colSpan={3}>
                {voucher.particulars}
              </td>
              <td className='border border-dark p-2 text-center' rowSpan={2}>
                {net.toLocaleString('en', { minimumFractionDigits: 2 })}
              </td>
            </tr>
            <tr>
              <td className='border border-dark p-2 text-center'>
                {voucher.monthPosting}
              </td>
              <td className='border border-dark p-2 text-center'>
                {voucher.itemCodeName}
              </td>
              <td className='border border-dark p-2 text-center'>
                EWT: {ewtAmount}
              </td>
            </tr>
          </tbody>
        </table>
        <table width={800} className='mb-2'>
          <tbody>
            <tr>
              <td className='text-center'>
                Received from {voucher.companyName} the sum of{' '}
                <u className='text-uppercase'>{amountInWords}</u> as payment of
                the above account
              </td>
            </tr>
          </tbody>
        </table>
        <table width={800} className='mb-2'>
          <tbody>
            <tr>
              <td className='font-weight-bold'>BANK:</td>
              <td>{voucher.bankAccountName}</td>
              <td className='font-weight-bold'>Received Payment By:</td>
            </tr>
            <tr>
              <td className='font-weight-bold'>DATE:</td>
              <td>{voucher.checkDate}</td>
              <td rowSpan={2} className='border-bottom border-dark'></td>
            </tr>
            <tr>
              <td className='font-weight-bold'>CHECK NO.</td>
              <td>{voucher.checkNumber}</td>
            </tr>
          </tbody>
        </table>
        <table width={800} className='mb-2'>
          <tbody>
            <tr style={{ height: '100px' }}>
              <td className={style.BorderDotted}>Prepared By:</td>
              <td className={style.BorderDotted}>Certified Correct By:</td>
              <td className={style.BorderDotted}>Approved By:</td>
            </tr>
          </tbody>
        </table>
        <table width={800}>
          <tbody>
            <tr>
              <td className='text-center text-warning h1'>
                {' '}
                --- DUPLICATE ---
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Voucher;
