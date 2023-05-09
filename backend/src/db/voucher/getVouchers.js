import dbQueryError from '../../error/dbQueryError';

const addVoucher = (dbPool, res, req) => {
  const query = `SELECT * FROM voucher`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default addVoucher;
