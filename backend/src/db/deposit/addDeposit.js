import dbQuery from '../../helper/dbQuery';
import { numberInput, stringInput } from '../../helper/emptyToNull';
import useResponse from '../../helper/useResponse';

const addDeposit = async (dbPool, res, req) => {
  const data = req.body;
  const response = useResponse(res);

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
    response.dbError(error, query);
    return;
  }

  response.success(result, 'Successfully added deposit.');
};

export default addDeposit;
