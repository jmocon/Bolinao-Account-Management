import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const updateDepositSlipPrintDate = async (dbPool, res, req) => {
  const depositSlipId = req.params.id;
  const query = `
  UPDATE deposit_slips
  SET date_printed = current_timestamp()
  WHERE id = ${depositSlipId}
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

export default updateDepositSlipPrintDate;
