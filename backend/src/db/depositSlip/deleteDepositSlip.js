import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const deleteDepositSlip = async (dbPool, res, req) => {
  const dsQuery = `DELETE FROM deposit_slips WHERE id = ${req.params.id}`;

  let dsResult;
  try {
    dsResult = await dbQuery(dbPool, dsQuery);
  } catch (error) {
    dbQueryError(res, error, dsQuery);
    return
  }

  const dscQuery = `
  DELETE FROM deposit_slip_content 
  WHERE deposit_slips_id = ${req.params.id}`;

  let dscResult;
  try {
    dscResult = await dbQuery(dbPool, dscQuery);
  } catch (error) {
    dbQueryError(res, error, dscQuery);
    return
  }

  res.send(
    JSON.stringify({
      success: true,
      data: { depositSlip: dsResult, depositSlipContent: dscResult }
    })
  );
};

export default deleteDepositSlip;
