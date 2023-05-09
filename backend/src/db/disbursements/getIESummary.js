const getIESummary = (dbPool, res, req) => {
  const data = req.query; // { companyId: '2', month: '2023-06' }

  const query = `
  SELECT
    ic.name as itemCodeName,
    d.particulars as particulars,
    d.vatable_amount as vatableAmount,
    d.non_vatable_amount as nonVatableAmount,
    e.tax_rate as ewtRate
  FROM disbursements d
  LEFT JOIN item_code ic
    ON d.item_code = ic.id
  LEFT JOIN ewt e
    ON d.ewt_id = e.id
  WHERE
    d.company_id = ${data.companyId}
    AND DATE_FORMAT(d.disbursement_date,'%Y-%m') = "${data.month}"
    AND (d.expense_category = 1 OR d.expense_category = 2)
  `;

  dbPool.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(JSON.stringify(result));
  });
};

export default getIESummary;
