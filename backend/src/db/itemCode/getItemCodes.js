import dbQueryError from '../../error/dbQueryError';

const addItemCodes = (dbPool, res, req) => {
  const query = `SELECT * FROM item_code`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default addItemCodes;
