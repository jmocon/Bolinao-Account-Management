import dbQueryError from '../../error/dbQueryError';

const getCompany = async (dbPool, res, req) => {
    if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'Company id is not present' })
    );
    return
  }

  const query = `SELECT * FROM company WHERE id = ${req.params.id}`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default getCompany;
