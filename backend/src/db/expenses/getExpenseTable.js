import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const getExpenseTable = async (dbPool, res, req) => {
  const query = `
  SELECT
    d.id as id,
    c.name as companyName,
    d.expense_category as expenseCategory,
    ic.name as itemCode,
    d.particulars,
    DATE_FORMAT(d.invoice_date,'%Y-%m-%d') as invoiceDate,
    d.invoice_number as invoiceNumber,
    s.name as supplierName,
    s.tin as supplierTin,
    s.address as supplierAddress,
    d.vatable_amount as vatableAmount,
    d.non_vatable_amount as nonVatableAmount,
    e.atc as ewtCode,
    e.tax_rate as ewtRate,
    d.mode_of_payment as modeOfPayment,
    d.remarks,
    d.status
    FROM expenses d
    LEFT JOIN company c
      ON d.company_id = c.id
    LEFT JOIN item_code ic
      ON d.item_code = ic.id
    LEFT JOIN supplier s
      ON d.supplier_id = s.id
    LEFT JOIN ewt e
      ON d.ewt_id = e.id
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

export default getExpenseTable;
