import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';
import { stringInput, numberInput } from '../../helper/emptyToNull';

const updateExpense = async (dbPool, res, req) => {
  const data = req.body;

  const query = `
  UPDATE expenses
  SET
    company_id = ${numberInput(data.companyId)},
    expense_date = ${stringInput(data.expenseDate)},
    expense_category = ${numberInput(data.expenseCategory)},
    supplier_id = ${numberInput(data.supplierId)},
    particulars = ${stringInput(data.particulars)},
    item_code = ${numberInput(data.itemCode)},
    invoice_date = ${stringInput(data.invoiceDate)},
    invoice_number = ${stringInput(data.invoiceNumber)},
    vatable_amount = ${numberInput(data.vatableAmount)},
    non_vatable_amount = ${numberInput(data.nonVatableAmount)},
    ewt_id = ${numberInput(data.ewtId)},
    mode_of_payment = ${numberInput(data.modeOfPayment)},
    remarks = ${stringInput(data.remarks)},
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

export default updateExpense;
