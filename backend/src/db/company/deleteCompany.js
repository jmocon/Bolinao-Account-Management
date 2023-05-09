import dbQueryError from '../../error/dbQueryError';

const deleteCompany = (dbPool, res, req) => {
  const query = `DELETE FROM company WHERE id = ${req.params.id}`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default deleteCompany;
