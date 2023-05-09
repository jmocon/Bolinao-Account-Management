import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const getVoucherDetails = async (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'Voucher id is not present' })
    );
    return;
  }

  const query = `
  SELECT
    CONCAT(v.code,"-",LPAD(v.counter, 5, 0)) as voucherCode,
    DATE_FORMAT(v.date_created,'%M %e, %Y') as voucherDate,
    s.check_payee as checkPayee,
    d.particulars as particulars,
    DATE_FORMAT(d.disbursement_date,'%b-%y') as monthPosting,
    ic.name as itemCodeName,
    d.vatable_amount as vatableAmount,
    d.non_vatable_amount as nonVatableAmount,
    e.atc as ewtCode,
    e.tax_rate as ewtTaxRate,
    c.name as companyName,
    ba.name as bankAccountName,
    d.check_number as checkNumber,
    DATE_FORMAT(d.check_date,'%M %e, %Y') as checkDate
  FROM voucher v
  INNER JOIN disbursements d
    ON v.disbursement_id = d.id
  LEFT JOIN supplier s
    ON d.supplier_id = s.id
  LEFT JOIN item_code ic
    ON d.item_code = ic.id
  LEFT JOIN ewt e
    ON d.ewt_id = e.id
  LEFT JOIN company c
    ON d.company_id = c.id
  LEFT JOIN bank_account ba
    ON d.bank_account_id = ba.id
  WHERE v.id = ${req.params.id}`;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    dbQueryError(res, error, query);
    return;
  }
  res.send(JSON.stringify({ success: true, data: result }));
};

export default getVoucherDetails;
