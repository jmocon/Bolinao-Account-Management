import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';
import { numberInput, stringInput } from '../../helper/emptyToNull';

const updateDisbursement = async (dbPool, res, req) => {
  const data = req.body;

  const query = `
  UPDATE disbursements
  SET
    company_id = ${numberInput(data.companyId)},
    disbursement_date = ${stringInput(data.disbursementDate)},
    expense_category = ${numberInput(data.expenseCategory)},
    non_expense_category = ${numberInput(data.nonExpenseCategory)},
    supplier_id = ${numberInput(data.supplierId)},
    particulars = ${stringInput(data.particulars)},
    item_code = ${numberInput(data.itemCode)},
    vatable_amount = ${numberInput(data.vatableAmount)},
    non_vatable_amount = ${numberInput(data.nonVatableAmount)},
    ewt_id = ${numberInput(data.ewtId)},
    ap_charge_to = ${stringInput(data.apChargeTo)},
    bank_account_id = ${numberInput(data.bankAccountId)},
    check_number = ${stringInput(data.checkNumber)},
    check_date = ${stringInput(data.checkDate)},
    status = ${data.status}
  WHERE id = ${req.params.id}
    `;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    dbQueryError(res, error, query);
    return;
  }

  res.send(JSON.stringify({ success: true, data: result }));
};

export default updateDisbursement;
