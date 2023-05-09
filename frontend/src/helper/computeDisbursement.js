const computeDisbursement = (nonVatable = 0, vatable = 0, ewtRate = 0) => {
  const vat = vatable * 0.12;
  const gross = nonVatable + vatable + vat;
  const ewt = vatable * (ewtRate / 100);
  const net = gross - ewt;
  
  return {
    nonVatable,
    vatable,
    vat,
    gross,
    ewtRate,
    ewt,
    net
  };
};

export default computeDisbursement;
