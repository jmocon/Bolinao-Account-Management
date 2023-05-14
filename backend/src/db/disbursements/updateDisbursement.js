import dbQueryError from '../../error/dbQueryError';

const updateDisbursement = async (dbPool, res, req) => {
  const data = req.body;

  const query = `
  UPDATE disbursements
  SET
    company_id = ${data.companyId || 'NULL'},
    disbursement_date = "${data.disbursementDate || ''}",
    expense_category = ${data.expenseCategory || 'NULL'},
    non_expense_category = ${
      data.nonExpenseCategory !== null ? data.nonExpenseCategory : 'NULL'
    },
    supplier_id = ${data.supplierId || 'NULL'},
    particulars = "${data.particulars || ''}",
    item_code = ${data.itemCode || 'NULL'},
    vatable_amount = ${data.vatableAmount || 'NULL'},
    non_vatable_amount = ${data.nonVatableAmount || 'NULL'},
    ewt_id = ${data.ewtId || 'NULL'},
    ap_charge_to = "${data.apChargeTo || ''}",
    bank_account_id = ${data.bankAccountId || 'NULL'},
    check_number = "${data.checkNumber || ''}",
    check_date = "${data.checkDate || ''}",
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
