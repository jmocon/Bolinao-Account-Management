import dbQueryError from '../../error/dbQueryError';

const getCompanies = (dbPool, res, req) => {
  const query = `SELECT * FROM company`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default getCompanies;
