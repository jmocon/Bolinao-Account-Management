const getExpenseDetails = async (dbPool, res, req) => {
  const query = `
    SELECT
      ex.id as expenseId,
      ex.expense_date as expenseDate,
      ex.expense_category as expenseCategoryId,
      c.name as companyName,
      s.name as supplierName,
      s.tin as supplierTin,
      s.address as supplierAddress,
      ex.particulars as particulars,
      ic.name as itemCode,
      ex.invoice_date as invoiceDate,
      ex.invoice_number as invoiceNumber,
      ex.vatable_amount as vatableAmount,
      ex.non_vatable_amount as nonVatableAmount,
      e.atc as ewtCode,
      e.tax_rate as ewtTaxRate,
      ex.mode_of_payment as modeOfPayment,
      ex.remarks as remarks,
      ex.status as status
    FROM expenses ex
    LEFT JOIN company as c
      ON ex.company_id = c.id
    LEFT JOIN supplier as s
      ON ex.supplier_id = s.id
    LEFT JOIN item_code as ic
      ON ex.item_code = ic.id
    LEFT JOIN ewt as e
      ON ex.ewt_id = e.id
    WHERE ex.id = ${req.params.id}
  `;

  dbPool.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(JSON.stringify(result));
  });
};

export default getExpenseDetails;
