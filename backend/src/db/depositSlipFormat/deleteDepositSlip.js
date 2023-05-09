import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const deleteDepositSlip = async (dbPool, res, req) => {
  const queryFormat = `
  DELETE FROM deposit_slip_format 
  WHERE id = ${req.params.id}`;
  const queryLayout = `
  DELETE FROM deposit_slip_layout 
  WHERE deposit_slip_format_id = ${req.params.id}`;

  let formatResult;
  try {
    formatResult = await dbQuery(dbPool, queryFormat);
  } catch (error) {
    dbQueryError(res, error, queryFormat);
  }

  let layoutResult;
  try {
    layoutResult = await dbQuery(dbPool, queryLayout);
  } catch (error) {
    dbQueryError(res, error, queryLayout);
  }

  res.send(JSON.stringify({ success: true, formatResult, layoutResult }));
};

export default deleteDepositSlip;
