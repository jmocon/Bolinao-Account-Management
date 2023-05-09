import dbQueryError from '../../error/dbQueryError';

const addEWT = (dbPool, res, req) => {
  const query = `SELECT * FROM ewt`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default addEWT;
