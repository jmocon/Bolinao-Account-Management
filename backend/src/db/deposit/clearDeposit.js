import dbQueryError from '../../error/dbQueryError';

const clearDeposit = (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'Deposit id is not present' })
    );
    return;
  }

  const data = req.body;
  const query = `
  UPDATE deposit
  SET cleared_date = "${data.clearedDate}"
  WHERE id = "${req.params.id}"
  `;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default clearDeposit;
