import dbQueryError from '../../error/dbQueryError';

const addSupplier = (dbPool, res, req) => {
  const query = `SELECT * FROM supplier`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default addSupplier;
