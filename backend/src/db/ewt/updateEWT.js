const updateEWT = (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'EWT id is not present' })
    );
    return
  }

  const data = req.body;
  const query = `
  UPDATE ewt
  SET
    tax_type = "${data.taxType}",
    description = "${data.description}",
    tax_rate = ${data.taxRate},
    atc = "${data.atc}"
  WHERE id = "${req.params.id}"
  `;

  dbPool.query(query, (err, result) => {
    if (err) {
      const message = err?.sqlMessage || err;
      console.error({ message, query });
      res.send(JSON.stringify({ success: false, message }));
    }

    res.send(JSON.stringify({ success: true, data: result }));
  });
};

export default updateEWT;
