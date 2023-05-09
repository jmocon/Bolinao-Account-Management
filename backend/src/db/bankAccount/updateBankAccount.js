import dbQueryError from '../../error/dbQueryError';

const updateBankAccount = (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({
        success: false,
        message: 'Bank account id is not present'
      })
    );
    return;
  }

  const data = req.body;
  const query = `
  UPDATE bank_account
  SET
    name = "${data.name}",
    bank_id = "${data.bankId}",
    account_number = "${data.accountNumber}",
    account_name = "${data.accountName}"
  WHERE id = "${req.params.id}"
  `;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default updateBankAccount;
