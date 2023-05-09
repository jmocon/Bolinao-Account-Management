import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';
import { numberInput, stringInput } from '../../helper/emptyToNull';

const addDeposit = async (dbPool, res, req) => {
  const data = req.body;

  const query = `
  INSERT INTO deposit
  (
    bank_account_id,
    payee,
    particular,
    deposit_date,
    amount,
    mode_of_payment,
    bank_id,
    check_number,
    check_date
  ) VALUES (
    ${data.bankAccountId},
    "${data.payee}",
    "${data.particular}",
    "${data.depositDate}",
    ${data.amount},
    ${data.modeOfPayment},
    ${numberInput(data.bankId)},
    ${stringInput(data.checkNumber)},
    ${stringInput(data.checkDate)}
  )`;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    dbQueryError(res, error, query);
    return;
  }

  res.send(JSON.stringify({ success: true, data: result }));
};

export default addDeposit;
