const addBank = (dbPool, res, req) => {
  const data = req.body;
  const query = `
  INSERT INTO bank
  (
    name,
    abbr
    )
    VALUES
    (
    "${data.name}",
    "${data.abbr}"
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

export default addBank;
