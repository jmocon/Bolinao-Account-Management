const updateSupplier = (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'Supplier id is not present' })
    );
    return;
  }

  const data = req.body;
  const query = `
  UPDATE supplier
  SET
    name = "${data.name}",
    address = "${data.address}",
    tin = "${data.tin}",
    contact_number = "${data.contactNumber}",
    check_payee = "${data.checkPayee}"
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

export default updateSupplier;
