import dbQueryError from '../../error/dbQueryError';

const getDeposit = (dbPool, res, req) => {
  const query = `SELECT * FROM deposit`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default getDeposit;
