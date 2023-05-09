import dbQueryError from '../../error/dbQueryError';

const updateDeposit = (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'Deposit id is not present' })
    );
    return;
  }

  const data = req.body;
  if (data.checkNumber) {
    data.checkNumber = `"${data.checkNumber}"`;
  }
  if (data.checkDate) {
    data.checkDate = `"${data.checkDate}"`;
  }

  const query = `
  UPDATE deposit
  SET
    bank_account_id = ${data.bankAccountId},
    payee = "${data.payee}",
    particular = "${data.particular}",
    deposit_date = "${data.depositDate}",
    amount = ${data.amount},
    mode_of_payment = ${data.modeOfPayment},
    bank_id = ${data.bankId || 'NULL'},
    check_number = ${data.checkNumber || 'NULL'},
    check_date = ${data.checkDate || 'NULL'}
  WHERE id = "${req.params.id}"
  `;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err, query);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default updateDeposit;
