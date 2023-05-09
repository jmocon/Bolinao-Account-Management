import dbQueryError from '../../error/dbQueryError';

const getCheckTable = (dbPool, res, req) => {
  const query = `
    SELECT
      c.id as checkId,
      b.name as bankName,
      c.name as name
    FROM \`check\` c
    INNER JOIN bank b
      ON c.bank_id = b.id`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err, query);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default getCheckTable;
