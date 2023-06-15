const getDisbursementTable = (dbPool, res, req) => {
  const query = `
  SELECT
    d.id as id,
    c.name as companyName,
    c.code as companyCode,
    d.expense_category as expenseCategory,
    d.non_expense_category as nonExpenseCategory,
    CONCAT(v.code,"-",LPAD(V.COUNTER, 5, 0)) as voucherCode,
    DATE_FORMAT(v.date_created,'%Y-%m-%d') as voucherDate,
    s.name as supplierName,
    s.check_payee as checkPayee,
    d.particulars,
    ic.name as itemCode,
    DATE_FORMAT(d.disbursement_date,'%b-%y') as monthPosting,
    d.vatable_amount as vatableAmount,
    d.non_vatable_amount as nonVatableAmount,
    e.atc as ewtCode,
    e.tax_rate as ewtRate,
    d.ap_charge_to as apChargeTo,
    ba.name as bankAccountName,
    d.check_number as checkNumber,
    DATE_FORMAT(d.check_date,'%Y-%m-%d') as checkDate,
    DATE_FORMAT(d.cleared_date,'%Y-%m-%d') as clearedDate,
    d.status as status
  FROM disbursements d
  LEFT JOIN company c
    ON d.company_id = c.id
  LEFT JOIN voucher v
      ON d.id = v.disbursement_id
  LEFT JOIN supplier s
    ON d.supplier_id = s.id
  LEFT JOIN item_code ic
    ON d.item_code = ic.id
  LEFT JOIN ewt e
    ON d.ewt_id = e.id
  LEFT JOIN bank_account ba
    ON d.bank_account_id = ba.id
  `;

  dbPool.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(JSON.stringify(result));
  });
};

export default getDisbursementTable;
