import dbQueryError from "../../error/dbQueryError";
import dbQuery from '../../helper/dbQuery';

const getBankReconciliation = async (dbPool, res, req) => {
  const bankAccountId = req.params.bankAccountId
  const startDate = req.params.startDate
  const endDate = req.params.endDate

  const disQuery = `
  SELECT
    d.id as disbursementId,
    d.vatable_amount as vatableAmount,
    d.non_vatable_amount as nonVatableAmount,
    d.non_vatable_amount as nonVatableAmount,
    e.tax_rate as ewtTaxRate,
    DATE_FORMAT(d.cleared_date,'%Y-%m-%d') as clearedDate
  FROM disbursements d
  LEFT JOIN ewt e
    ON d.ewt_id = e.id
  WHERE
    d.bank_account_id = ${bankAccountId}
    AND d.cleared_date >= "${startDate}"
    AND d.cleared_date <= "${endDate}"
  `;

  
  let disResult;
  try {
    disResult = await dbQuery(dbPool, disQuery);
  } catch (error) {
    dbQueryError(res, error, disQuery);
  }

  const depositQuery = `
  SELECT
    SUM(d.amount) as amount,
    DATE_FORMAT(d.cleared_date,'%Y-%m-%d') as clearedDate
  FROM deposit d
  WHERE
    d.bank_account_id = ${bankAccountId}
    AND d.cleared_date >= "${startDate}"
    AND d.cleared_date <= "${endDate}"
  GROUP BY d.cleared_date
  `;

  
  let depositResult;
  try {
    depositResult = await dbQuery(dbPool, depositQuery);
  } catch (error) {
    dbQueryError(res, error, depositQuery);
  }

  res.send(JSON.stringify({ disbursement: disResult, deposit: depositResult }));
};

export default getBankReconciliation;