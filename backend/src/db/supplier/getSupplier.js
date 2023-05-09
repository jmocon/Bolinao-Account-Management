import dbQueryError from '../../error/dbQueryError';

const getSupplier = async (dbPool, res, req) => {
    if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'Supplier id is not present' })
    );
    return
  }

  const query = `SELECT * FROM supplier WHERE id = ${req.params.id}`;

  dbPool.query(query, (err, result) => {
    if (err) {
      console.log(err);
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default getSupplier;
