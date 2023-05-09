const updateVoucher = (dbPool, res, req) => {
  if (!req?.params?.id) {
    res.send(
      JSON.stringify({ success: false, message: 'Voucher id is not present' })
    );
    return;
  }

  const data = req.body;
  const query = `
  UPDATE voucher
  SET
    disbursement_id = "${data.disbursement_id}",
    code = "${data.code}",
    counter = "${data.counter}"
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

export default updateVoucher;
