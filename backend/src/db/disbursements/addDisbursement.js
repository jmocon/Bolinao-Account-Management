import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';
import { numberInput, stringInput } from '../../helper/emptyToNull';

const addDisbursement = async (dbPool, res, req) => {
  const data = req.body;
  const query = `
  INSERT INTO disbursements
  (
    company_id,
    disbursement_date,
    expense_category,
    non_expense_category,
    supplier_id,
    particulars,
    item_code,
    vatable_amount,
    non_vatable_amount,
    ewt_id,
    ap_charge_to,
    bank_account_id,
    check_number,
    check_date,
    status
  ) VALUES (
    ${numberInput(data.companyId)},
    ${stringInput(data.disbursementDate)},
    ${numberInput(data.expenseCategory)},
    ${numberInput(data.nonExpenseCategory)},
    ${numberInput(data.supplierId)},
    ${stringInput(data.particulars)},
    ${numberInput(data.itemCode)},
    ${numberInput(data.vatableAmount)},
    ${numberInput(data.nonVatableAmount)},
    ${numberInput(data.ewtId)},
    ${stringInput(data.apChargeTo)},
    ${numberInput(data.bankAccountId)},
    ${stringInput(data.checkNumber)},
    ${stringInput(data.checkDate)},
    ${data.status}
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

export default addDisbursement;
