import dbQueryError from '../../error/dbQueryError';

const addCompany = (dbPool, res, req) => {
  const data = req.body;
  const query = `
  INSERT INTO company
  (
    code,
    name,
    address,
    tin
  ) VALUES (
    "${data.code}",
    "${data.name}",
    "${data.address}",
    "${data.tin}"
  )`;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default addCompany;
