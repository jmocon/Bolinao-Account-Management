const addSupplier = (dbPool, res, req) => {
  const data = req.body;
  const query = `
  INSERT INTO supplier (
    name,
    address,
    tin,
    contact_number,
    check_payee
  ) VALUES (
    "${data.name}",
    "${data.address}",
    "${data.tin}",
    "${data.contactNumber}",
    "${data.checkPayee}"
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

export default addSupplier;
