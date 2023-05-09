import dbQueryError from '../../error/dbQueryError';

const getBankAccounts = (dbPool, res, req) => {
  const query = `SELECT * FROM bank_account`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default getBankAccounts;
