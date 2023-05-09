import dbQueryError from '../../error/dbQueryError';

const getOpenDeposits = (dbPool, res, req) => {
  const query = `
  SELECT
    d.id as depositId,
    ba.name as bankAccountName,
    d.payee as payee,
    d.particular as particular,
    DATE_FORMAT(d.deposit_date,'%Y-%m-%d') as depositDate,
    b.abbr as bankName,
    d.mode_of_payment as modeOfPayment,
    d.amount as amount,
    d.check_number as checkNumber,
    DATE_FORMAT(d.check_date,'%Y-%m-%d') as checkDate,
    DATE_FORMAT(d.cleared_date,'%Y-%m-%d') as clearedDate
  FROM deposit d
  LEFT JOIN deposit_slip_content dsc
    ON d.id = dsc.deposit_id
  LEFT JOIN bank_account ba
    ON d.bank_account_id = ba.id
  LEFT JOIN bank b
    ON d.bank_id = b.id
  WHERE dsc.id IS NULL
  `;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default getOpenDeposits;
