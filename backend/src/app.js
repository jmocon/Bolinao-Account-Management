import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import company from './routes/company';
import deposit from './routes/deposit';
import depositSlip from './routes/depositSlip';
import depositSlipFormat from './routes/depositSlipFormat';
import bank from './routes/bank';
import bankAccount from './routes/bankAccount';
import disbursements from './routes/disbursements';
import expenses from './routes/expenses';
import ewt from './routes/ewt';
import itemCode from './routes/itemCode';
import supplier from './routes/supplier';
import voucher from './routes/voucher';
import check from './routes/check';
import user from './routes/user';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/company', company);
app.use('/bank', bank);
app.use('/deposit', deposit);
app.use('/depositSlip', depositSlip);
app.use('/depositSlipFormat', depositSlipFormat);
app.use('/bankAccount', bankAccount);
app.use('/disbursements', disbursements);
app.use('/expenses', expenses);
app.use('/ewt', ewt);
app.use('/itemCode', itemCode);
app.use('/supplier', supplier);
app.use('/voucher', voucher);
app.use('/check', check);
app.use('/user', user);

app.listen(3001, () => {
  console.log('listening on port 3001');
});
