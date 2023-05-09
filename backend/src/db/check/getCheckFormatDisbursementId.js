import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const getCheckFormatDisbursementId = async (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({
        success: false,
        message: 'Disbursement id is not present'
      })
    );
    return;
  }

  const query = `
  SELECT
    cf.*
  FROM disbursements d
  INNER JOIN bank_account ba
    ON d.bank_account_id = ba.id
  INNER JOIN \`check\` c
    ON ba.bank_id = c.bank_id
  INNER JOIN check_format cf
    ON c.id = cf.check_id
  WHERE d.id = ${req.params.id}`;

  let result;
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    dbQueryError(res, error, query);
    return;
  }

  res.send(JSON.stringify({ success: true, data: result }));
};

export default getCheckFormatDisbursementId;
