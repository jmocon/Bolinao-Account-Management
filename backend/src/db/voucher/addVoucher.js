import disbursementStatus from '../../constants/disbursementStatus.mjs';
import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';
import updateStatusQuery from '../disbursements/updateStatusQuery';

const addVoucher = async (dbPool, res, req) => {
  const data = req.body;

  const bankCodeQuery = `
    SELECT
      ba.name
    FROM disbursements d
    INNER JOIN bank_account ba
      ON d.bank_account_id = ba.id
    WHERE d.id = ${data.disbursementId}
  `;

  let bankAccount;
  try {
    const result = await dbQuery(dbPool, bankCodeQuery);
    bankAccount = result[0].name;
  } catch (error) {
    dbQueryError(res, error, bankCodeQuery);
  }

  const counterQuery = `
    SELECT
      MAX(v.counter) as counter
    FROM voucher v
    WHERE v.code = "${bankAccount}"
  `;

  let counter;
  try {
    const result = await dbQuery(dbPool, counterQuery);
    counter = result[0].counter;
  } catch (error) {
    dbQueryError(res, error, counterQuery);
  }

  if (!counter) {
    counter = 0;
  }
  counter += 1;

  const insertQuery = `
  INSERT INTO voucher
  (
    disbursement_id,
    code,
    counter
  ) VALUES (
    ${data.disbursementId},
    "${bankAccount}",
    "${counter}"
  )`;

  let insertResult;
  try {
    insertResult = await dbQuery(dbPool, insertQuery);
  } catch (error) {
    dbQueryError(res, error, insertQuery);
  }

  let updateStatusResult;
  try {
    updateStatusResult = await updateStatusQuery(
      dbPool,
      data.disbursementId,
      disbursementStatus.printed
    );
  } catch (error) {
    dbQueryError(res, error, insertQuery);
  }

  res.send(JSON.stringify({ success: true, data: insertResult }));
};

export default addVoucher;
