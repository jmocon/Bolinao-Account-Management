const getEWTSummary = (dbPool, res, req) => {
  const data = req.query; // { companyId: '2', month: '2023-06' }

  const query = `
  SELECT
    s.name as supplierName,
    d.particulars as particulars,
    d.vatable_amount as vatableAmount,
    e.tax_rate as ewtRate
  FROM disbursements d
  INNER JOIN company c
    ON d.company_id = c.id
  LEFT JOIN supplier s
    ON d.supplier_id = s.id
  LEFT JOIN ewt e
    ON d.ewt_id = e.id
  WHERE
    d.company_id = ${data.companyId}
    AND DATE_FORMAT(d.disbursement_date,'%Y-%m') = "${data.month}"
    AND d.ewt_id IS NOT NULL
  `;

  dbPool.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(JSON.stringify(result));
  });
};

export default getEWTSummary;
