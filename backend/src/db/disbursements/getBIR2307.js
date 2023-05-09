const getBIR2307 = async (dbPool, res, req) => {
  const query = `
    SELECT
      d.id as disbursementId,
      DATE_FORMAT(d.disbursement_date,'%m') as disbursementMonth,
      DATE_FORMAT(d.disbursement_date,'%Y') as disbursementYear,
      s.tin as supplierTin,
      s.name as supplierName,
      s.address as supplierAddress,
      c.tin as companyTin,
      c.name as companyName,
      c.address as companyAddress,
      e.description as ewtDescription,
      e.atc as ewtAtc,
      e.tax_rate as ewtTaxRate,
      d.vatable_amount as vatableAmount
    FROM disbursements d
    LEFT JOIN supplier as s
      ON d.supplier_id = s.id
    LEFT JOIN company as c
      ON d.company_id = c.id
    LEFT JOIN ewt as e
      ON d.ewt_id = e.id
    WHERE d.id = ${req.params.id}
  `;

  dbPool.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(JSON.stringify(result));
  });
};

export default getBIR2307;
