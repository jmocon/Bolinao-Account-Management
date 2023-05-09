const addItemCode = (dbPool, res, req) => {
  const data = req.body;
  const query = `
  INSERT INTO item_code
  (
    name
  ) VALUES (
    "${data.name}"
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

export default addItemCode;
