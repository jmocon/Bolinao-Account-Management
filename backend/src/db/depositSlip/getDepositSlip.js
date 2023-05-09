import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const getDepositSlip = async (dbPool, res, req) => {
  const dsQuery = `SELECT * FROM deposit_slips WHERE id=${req.params.id}`;

  let dsResult;
  try {
    dsResult = await dbQuery(dbPool, dsQuery);
  } catch (error) {
    dbQueryError(res, error, dsQuery);
  }

  const dscQuery = `
  SELECT 
    d.*,
    ba.name as bankAccountName,
    ba.account_number as bankAccountAccountNumber,
    ba.account_name as bankAccountAccountName,
    b.name as bankName,
    b.abbr as bankAbbr
  FROM deposit_slip_content dsc
  LEFT JOIN deposit d
    ON dsc.deposit_id = d.id
  LEFT JOIN bank_account ba
    ON d.bank_account_id = ba.id
  LEFT JOIN bank b
    ON d.bank_id = b.id
  WHERE dsc.deposit_slips_id=${req.params.id}`;

  let dscResult;
  try {
    dscResult = await dbQuery(dbPool, dscQuery);
  } catch (error) {
    dbQueryError(res, error, dscQuery);
  }

  res.send(
    JSON.stringify({
      success: true,
      data: { depositSlip: dsResult[0], deposits: dscResult }
    })
  );
};

export default getDepositSlip;
