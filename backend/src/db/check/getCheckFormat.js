import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const getCheckFormat = async (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'Bank id is not present' })
    );
    return;
  }

  const queryCheck = `
  SELECT
    b.id as bankId,
    b.name as bankName,
    c.name as name
  FROM \`check\` c
  INNER JOIN bank b
    ON c.bank_id = b.id
  WHERE c.id = ${req.params.id}`;

  let checkResult;
  try {
    checkResult = await dbQuery(dbPool, queryCheck);
  } catch (error) {
    dbQueryError(res, error, queryCheck);
  }

  const queryCheckFormat = `
  SELECT *
  FROM check_format cf
  WHERE check_id = ${req.params.id}`;

  let checkFormatResult;
  try {
    checkFormatResult = await dbQuery(dbPool, queryCheckFormat);
  } catch (error) {
    dbQueryError(res, error, queryCheck);
  }

  const data = {
    check: checkResult,
    checkFormat: checkFormatResult
  };

  res.send(JSON.stringify({ success: true, data }));
};

export default getCheckFormat;
