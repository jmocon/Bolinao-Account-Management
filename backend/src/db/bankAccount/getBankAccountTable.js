import dbQueryError from '../../error/dbQueryError';

const getBankAccountTable = (dbPool, res, req) => {
  const query = `
    SELECT 
      ba.id as id,
      ba.name as name,
      b.name as bank_name,
      ba.account_number as account_number
    FROM bank_account ba
    INNER JOIN bank b
      ON ba.bank_id = b.id`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err,query);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default getBankAccountTable;
