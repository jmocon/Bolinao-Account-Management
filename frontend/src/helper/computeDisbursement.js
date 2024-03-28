const computeDisbursement = (nonVatable = 0, vatable = 0, ewtRate = 0) => {
  const v = vatable ? vatable : 0;
  const nv = nonVatable ? nonVatable : 0;
  const vat = v * 0.12;
  const gross = nv + v + vat;
  const ewt = v * (ewtRate / 100);
  const net = gross - ewt;
  
  return {
    nonVatable:nv,
    vatable:v,
    vat,
    gross,
    ewtRate,
    ewt,
    net
  };
};

export default computeDisbursement;
