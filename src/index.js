import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AdminLayout from 'layouts/Admin/Admin';

import 'assets/scss/black-dashboard-react.scss';
import 'assets/demo/demo.css';
import 'assets/css/nucleo-icons.css';
import 'assets/css/jumee.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import ThemeContextWrapper from 'components/ThemeWrapper/ThemeWrapper';
import BackgroundColorWrapper from 'components/BackgroundColorWrapper/BackgroundColorWrapper';
import Voucher from 'views/Voucher/Voucher';
import Bir2307 from 'views/Bir2307/Bir2307';
import DESummaryPrint from 'views/DESummary/DESummaryPrint';
import IESummaryPrint from 'views/IESummary/IESummaryPrint';
import EWTSummaryPrint from 'views/EWTSummary/EWTSummaryPrint';
import Check from 'views/Check/Check';
import DepositSlipPrint from 'views/DepositSlip/DepositSlipPrint';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Switch>
          <Route path='/admin' render={(props) => <AdminLayout {...props} />} />
          <Route exact path='/voucher/:voucherId' render={() => <Voucher />} />
          <Route exact path='/check/:disbursementId' render={() => <Check />} />
          <Route exact path='/bir2307/:disbursementId' render={() => <Bir2307 />} />
          <Route exact path='/depositSlip/:depositSlipId' render={() => <DepositSlipPrint />} />
          <Route exact path='/deSummary/:companyId/:month' render={() => <DESummaryPrint />} />
          <Route exact path='/ieSummary/:companyId/:month' render={() => <IESummaryPrint />} />
          <Route exact path='/ewtSummary/:companyId/:month' render={() => <EWTSummaryPrint />} />
          <Redirect from='/' to='/admin/dashboard' />
        </Switch>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);
