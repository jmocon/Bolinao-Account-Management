import dbQueryError from '../../error/dbQueryError';

const updateCompany = (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'Company id is not present' })
    );
    return;
  }

  const data = req.body;
  const query = `
  UPDATE company
  SET
    code = "${data.code}",
    name = "${data.name}",
    address = "${data.address}",
    tin = "${data.tin}"
  WHERE id = "${req.params.id}"
  `;

  dbPool.query(query, (err, result) => {
    if (err) {
      dbQueryError(res, err);
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default updateCompany;
