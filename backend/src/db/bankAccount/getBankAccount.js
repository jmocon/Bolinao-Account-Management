import dbQueryError from '../../error/dbQueryError';
import dbQuery from '../../helper/dbQuery';

const getBankAccount = async (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({
        success: false,
        message: 'Bank account id is not present'
      })
    );
    return;
  }

  const query = `
    SELECT 
      ba.id as id,
      ba.name as name,
      b.id as bankId,
      b.name as bankName,
      ba.account_number as accountNumber,
      ba.account_name as accountName
    FROM bank_account ba
    INNER JOIN bank b
      ON ba.bank_id = b.id
    WHERE ba.id = ${req.params.id}`;

  let result = [];
  try {
    result = await dbQuery(dbPool, query);
  } catch (error) {
    dbQueryError(res, err, query);
  }

  if (result.length > 0) {
    result = result[0];
  }

  res.send(JSON.stringify({ success: true, data: result }));
};

export default getBankAccount;
