import dbQueryError from '../../error/dbQueryError';

const addBankAccount = (dbPool, res, req) => {
  const data = req.body;
  const query = `
  INSERT INTO bank_account
  (
    name,
    bank_id,
    account_number,
    account_name
  ) VALUES (
    "${data.name}",
    "${data.bankId}",
    "${data.accountNumber}",
    "${data.accountName}"
  )`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default addBankAccount;
