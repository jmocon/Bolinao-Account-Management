import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const getDepositSlipFormats = async (dbPool, res, req) => {
  const query = `
    SELECT
      dsf.id as depositSlipFormatId,
      b.name as bankName,
      dsf.name as name
    FROM deposit_slip_format dsf
    INNER JOIN bank b
      ON dsf.bank_id = b.id`;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    dbQueryError(res, err, query);
  }
  res.send(JSON.stringify({ success: true, data: result }));
};

export default getDepositSlipFormats;
