import dbQueryError from '../../error/dbQueryError';

const deleteBankAccount = (dbPool, res, req) => {
  const query = `DELETE FROM bank_account WHERE id = ${req.params.id}`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default deleteBankAccount;
