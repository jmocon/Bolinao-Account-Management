import dbQueryError from '../../error/dbQueryError';

const getVoucher = async (dbPool, res, req) => {
    if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'Voucher id is not present' })
    );
    return
  }

  const query = `SELECT * FROM voucher WHERE id = ${req.params.id}`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
      return
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default getVoucher;
