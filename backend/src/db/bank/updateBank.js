const updateBank = (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'Bank id is not present' })
    );
    return;
  }

  const data = req.body;
  const query = `
  UPDATE bank
  SET
    name = "${data.name}",
    abbr = "${data.abbr}"
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

export default updateBank;
