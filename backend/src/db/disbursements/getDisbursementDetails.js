const getDisbursementDetails = async (dbPool, res, req) => {
  const query = `
    SELECT
      d.id as disbursementId,
      DATE_FORMAT(d.disbursement_date,'%b %d, %Y') as disbursementDate,
      c.name as companyName,
      d.expense_category as expenseCategory,
      d.non_expense_category as nonExpenseCategory,
      ic.name as itemCode,
      s.name as supplierName,
      s.check_payee as checkPayee,
      d.particulars as particulars,
      d.vatable_amount as vatableAmount,
      d.non_vatable_amount as nonVatableAmount,
      e.atc as ewtCode,
      e.tax_rate as ewtTaxRate,
      ba.bank_id as bankId,
      ba.name as bankAccountName,
      d.ap_charge_to as apChargeTo,
      d.check_number as checkNumber,
      DATE_FORMAT(d.check_date,'%b %d, %Y') as checkDate,
      DATE_FORMAT(d.cleared_date,'%b %d, %Y') as clearedDate,
      d.status,
      v.id as voucherId,
      CONCAT(v.code,"-",LPAD(v.counter, 5, 0)) as voucherCode
    FROM disbursements d
    LEFT JOIN company as c
      ON d.company_id = c.id
    LEFT JOIN item_code as ic
      ON d.item_code = ic.id
    LEFT JOIN supplier as s
      ON d.supplier_id = s.id
    LEFT JOIN ewt as e
      ON d.ewt_id = e.id
    LEFT JOIN bank_account as ba
      ON d.bank_account_id = ba.id
    LEFT JOIN voucher v
      ON d.id = v.disbursement_id
    WHERE d.id = ${req.params.id}
  `;

  dbPool.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(JSON.stringify(result));
  });
};

export default getDisbursementDetails;
