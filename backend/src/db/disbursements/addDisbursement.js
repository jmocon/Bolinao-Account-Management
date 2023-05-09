import dbQueryError from '../../error/dbQueryError';

const addDisbursement = (dbPool, res, req) => {
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
    ${data.companyId || 'NULL'},
    "${data.disbursementDate || ''}",
    ${data.expenseCategory || 'NULL'},
    ${data.nonExpenseCategory || 'NULL'},
    ${data.supplierId || 'NULL'},
    "${data.particulars || ''}",
    ${data.itemCode || 'NULL'},
    ${data.vatableAmount || 'NULL'},
    ${data.nonVatableAmount || 'NULL'},
    ${data.ewtId || 'NULL'},
    "${data.apChargeTo || ''}",
    ${data.bankAccountId || 'NULL'},
    "${data.checkNumber || ''}",
    "${data.checkDate || ''}",
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

export default addDisbursement;
