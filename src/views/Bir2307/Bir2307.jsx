import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getBIR2307 } from 'api/disbursement';

import Form2307 from './assets/Form2307.png';
import style from './assets/Bir2307.module.css';

const Bir2307 = () => {
  const { disbursementId } = useParams();
  const [dis, setDis] = useState({});

  const [oneFrom, setOneFrom] = useState();
  const [oneTo, setOneTo] = useState();
  const [amountPerQuarter, setAmountPerQuarter] = useState();

  const getQuarterRange = (disMonth) => {
    const month = Number(disMonth);
    const quarter = Math.ceil(month / 3);
    const to = quarter * 3;
    const from = to - 2;

    return {
      from: String(from).padStart(2, '0'),
      to: String(to).padStart(2, '0')
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!disbursementId) {
        return;
      }
      let result;
      try {
        result = await getBIR2307(disbursementId);
      } catch (error) {
        console.log(error);
      }

      const quarterRange = getQuarterRange(result.disbursementMonth);
      const lastDay = new Date(
        result.disbursementYear,
        quarterRange.to,
        0
      ).getDate();

      setOneFrom(`${quarterRange.from}/01/${result.disbursementYear}`);
      setOneTo(`${quarterRange.to}/${lastDay}/${result.disbursementYear}`);

      switch (Number(result.disbursementMonth) % 3) {
        case 1:
          setAmountPerQuarter({ firstMonth: result.vatableAmount });
          break;
        case 3:
          setAmountPerQuarter({ secondMonth: result.vatableAmount });
          break;
        default:
          setAmountPerQuarter({ thirdMonth: result.vatableAmount });

          break;
      }

      setDis(result);
    };
    fetchData();
  }, [disbursementId]);

  return (
    <div className={style.Wrapper}>
      <div className={style.oneFrom}>
        <p>{oneFrom}</p>
      </div>
      <div className={style.oneTo}>
        <p>{oneTo}</p>
      </div>

      <div className={style.twoFirst}>
        <p>{`${dis.supplierTin}`.substring(0, 3)}</p>
      </div>
      <div className={style.twoSecond}>
        <p>{`${dis.supplierTin}`.substring(3, 6)}</p>
      </div>
      <div className={style.twoThird}>
        <p>{`${dis.supplierTin}`.substring(6, 9)}</p>
      </div>
      <div className={style.twoFourth}>
        <p>{`${dis.supplierTin}`.substring(9)}</p>
      </div>

      <div className={style.payeeName}>
        <p>{dis.supplierName}</p>
      </div>

      <div className={style.payeeAddress}>
        <p>{dis.supplierAddress}</p>
      </div>

      <div className={style.sixFirst}>
        <p>{`${dis.companyTin}`.substring(0, 3)}</p>
      </div>
      <div className={style.sixSecond}>
        <p>{`${dis.companyTin}`.substring(3, 6)}</p>
      </div>
      <div className={style.sixThird}>
        <p>{`${dis.companyTin}`.substring(6, 9)}</p>
      </div>
      <div className={style.sixFourth}>
        <p>{`${dis.companyTin}`.substring(9)}</p>
      </div>

      <div className={style.payorsName}>
        <p>{dis.companyName}</p>
      </div>
      <div className={style.payorsAddress}>
        <p>{dis.companyAddress}</p>
      </div>

      <div className={style.ewtDescription}>
        <p>{dis.ewtDescription}</p>
      </div>
      <div className={style.ewtAtc}>
        <p>{dis.ewtAtc}</p>
      </div>
      <div className={style.firstQuarter}>
        <p>
          {amountPerQuarter?.firstMonth
            ? amountPerQuarter.firstMonth.toLocaleString('en', {
                minimumFractionDigits: 2
              })
            : null}
        </p>
      </div>
      <div className={style.secondQuarter}>
        <p>
          {amountPerQuarter?.secondMonth
            ? amountPerQuarter.secondMonth.toLocaleString('en', {
                minimumFractionDigits: 2
              })
            : null}
        </p>
      </div>
      <div className={style.thirdQuarter}>
        <p>
          {amountPerQuarter?.thirdMonth
            ? amountPerQuarter.thirdMonth.toLocaleString('en', {
                minimumFractionDigits: 2
              })
            : null}
        </p>
      </div>
      <div className={style.vatableAmount}>
        <p>
          {dis.vatableAmount &&
            dis.vatableAmount.toLocaleString('en', {
              minimumFractionDigits: 2
            })}
        </p>
      </div>
      <div className={style.ewtTotal}>
        <p>
          {((dis.vatableAmount * dis.ewtTaxRate) / 100).toLocaleString('en', {
            minimumFractionDigits: 2
          })}
        </p>
      </div>

      <div className={style.firstQuarterTotal}>
        <p>
          {amountPerQuarter?.firstMonth
            ? amountPerQuarter.firstMonth.toLocaleString('en', {
                minimumFractionDigits: 2
              })
            : null}
        </p>
      </div>
      <div className={style.secondQuarterTotal}>
        <p>
          {amountPerQuarter?.secondMonth
            ? amountPerQuarter.secondMonth.toLocaleString('en', {
                minimumFractionDigits: 2
              })
            : null}
        </p>
      </div>
      <div className={style.thirdQuarterTotal}>
        <p>
          {amountPerQuarter?.thirdMonth
            ? amountPerQuarter.thirdMonth.toLocaleString('en', {
                minimumFractionDigits: 2
              })
            : null}
        </p>
      </div>
      <div className={style.vatableAmountTotal}>
        <p>
          {dis.vatableAmount &&
            dis.vatableAmount.toLocaleString('en', {
              minimumFractionDigits: 2
            })}
        </p>
      </div>
      <div className={style.ewtTotalTotal}>
        <p>
          {((dis.vatableAmount * dis.ewtTaxRate) / 100).toLocaleString('en', {
            minimumFractionDigits: 2
          })}
        </p>
      </div>

      <img
        src={Form2307}
        alt='Form 2307'
        className={style.ImageForm}
        style={{ maxWidth: 'none !important' }}
      />
    </div>
  );
};

export default Bir2307;
