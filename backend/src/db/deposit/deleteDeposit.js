import dbQueryError from '../../error/dbQueryError';

const deleteDeposit = (dbPool, res, req) => {
  const query = `DELETE FROM deposit WHERE id = ${req.params.id}`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default deleteDeposit;
