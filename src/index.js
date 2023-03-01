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

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Switch>
          <Route path='/admin' render={(props) => <AdminLayout {...props} />} />
          <Route exact path='/voucher/:voucherId' render={() => <Voucher />} />
          <Route exact path='/bir2307/:disbursementId' render={() => <Bir2307 />} />
          <Redirect from='/' to='/admin/dashboard' />
        </Switch>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);
