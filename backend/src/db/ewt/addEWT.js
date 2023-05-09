const addEWT = (dbPool, res, req) => {
  const data = req.body;
  const query = `
  INSERT INTO ewt
  (
    tax_type,
    description,
    tax_rate,
    atc
    )
    VALUES
    (
    "${data.taxType}",
    "${data.description}",
    ${data.taxRate},
    "${data.atc}"
    )`;

  dbPool.query(query, (err, result) => {
    if (err) {
      const message = err?.sqlMessage || err;
      console.error({ message, query });
      res.send(JSON.stringify({ success: false, message }));
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default addEWT;
