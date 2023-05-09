import dbQueryError from '../../error/dbQueryError';

const getUsers = (dbPool, res, req) => {
  const query = `SELECT * FROM users`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err, query);
    }

    res.send(JSON.stringify({ success: true, users: result }));
  });
};

export default getUsers;
