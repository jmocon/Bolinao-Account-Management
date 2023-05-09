import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const deleteCheck = async (dbPool, res, req) => {
  const queryCheck = `DELETE FROM \`check\` WHERE id = ${req.params.id}`;
  const queryCheckFormat = `DELETE FROM check_format WHERE check_id = ${req.params.id}`;

  let checkResult;
  try {
    checkResult = await dbQuery(dbPool, queryCheck);
  } catch (error) {
    dbQueryError(res, error, queryCheck);
  }

  let checkFormatResult;
  try {
    checkFormatResult = await dbQuery(dbPool, queryCheckFormat);
  } catch (error) {
    dbQueryError(res, error, queryCheckFormat);
  }

  res.send(JSON.stringify({ success: true, checkResult, checkFormatResult }));
};

export default deleteCheck;
