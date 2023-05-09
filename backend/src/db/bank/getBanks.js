import dbQueryError from '../../error/dbQueryError';

const getBanks = (dbPool, res, req) => {
  const query = `SELECT * FROM bank`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default getBanks;
