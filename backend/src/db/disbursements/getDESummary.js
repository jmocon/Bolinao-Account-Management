const getDESummary = (dbPool, res, req) => {
  const data = req.query; // { companyId: '2', month: '2023-06' }

  const query = `
  SELECT
    d.id as disbursementId,
    s.name as supplierName,
    s.address as supplierAddress,
    s.tin as supplierTIN,
    ic.name as itemCodeName,
    d.vatable_amount as vatableAmount,
    d.non_vatable_amount as nonVatableAmount
  FROM disbursements d
  INNER JOIN company c
    ON d.company_id = c.id
  LEFT JOIN supplier s
    ON d.supplier_id = s.id
  LEFT JOIN item_code ic
    ON d.item_code = ic.id
  WHERE
    d.company_id = ${data.companyId}
    AND DATE_FORMAT(d.disbursement_date,'%Y-%m') = "${data.month}"
    AND (d.expense_category = 0 OR d.expense_category = 2)
  `;

  dbPool.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(JSON.stringify(result));
  });
};

export default getDESummary;
