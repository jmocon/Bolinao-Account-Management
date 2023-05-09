import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const getDepositSlips = async (dbPool, res, req) => {
  const query = `SELECT * FROM deposit_slips`;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    dbQueryError(res, error, query);
    return;
  }

  res.send(JSON.stringify({ success: true, data: result }));
};

export default getDepositSlips;
