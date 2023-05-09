import dbQueryError from '../../error/dbQueryError';
import { stringInput, numberInput } from '../../helper/emptyToNull';

const addExpense = (dbPool, res, req) => {
  const data = req.body;
  const query = `
  INSERT INTO expenses
  (
    company_id,
    expense_date,
    expense_category,
    supplier_id,
    particulars,
    item_code,
    invoice_date,
    invoice_number,
    vatable_amount,
    non_vatable_amount,
    ewt_id,
    mode_of_payment,
    remarks,
    status
  ) VALUES (
    ${numberInput(data.companyId)},
    ${stringInput(data.expenseDate)},
    ${numberInput(data.expenseCategory)},
    ${numberInput(data.supplierId)},
    ${stringInput(data.particulars)},
    ${numberInput(data.itemCode)},
    ${stringInput(data.invoiceDate)},
    ${stringInput(data.invoiceNumber)},
    ${numberInput(data.vatableAmount)},
    ${numberInput(data.nonVatableAmount)},
    ${numberInput(data.ewtId)},
    ${numberInput(data.modeOfPayment)},
    ${stringInput(data.remarks)},
    ${data.status}
  )`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err, query);
      return;
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default addExpense;
