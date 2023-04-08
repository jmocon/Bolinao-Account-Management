const numberToCurrency = (value = 0) => (
  <div className='d-flex justify-content-between'>
    <div className="mr-1">₱</div>
    <div>
      {value.toLocaleString('en', {
        minimumFractionDigits: 2
      })}
    </div>
  </div>
);
export default numberToCurrency;
