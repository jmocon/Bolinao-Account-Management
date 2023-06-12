import Disbursements from "views/Disbursements/Disbursements";
import Deposits from "views/Deposits/Deposits";
import Expenses from "views/Expenses/Expenses";
import Suppliers from "views/Suppliers/Suppliers";
import Users from "views/Users/Users";


import EWTs from "views/EWTs/EWTs"
import BankAccounts from "views/BankAccount/BankAccount";
import Banks from "views/Banks/Banks";
import ItemCodes from "views/ItemCode/ItemCode";
import Roles from "views/Roles/Roles";


// import Dashboard from "views/Dashboard.js";
// import Icons from "views/Icons.js";
// import Map from "views/Map.js";
// import Notifications from "views/Notifications.js";
import Company from "views/Company/Company";
import DEReport from "views/DESummary/DESummary";
import IEReport from "views/IESummary/IESummary";
import EWTReport from "views/EWTSummary/EWTSummary";
import CheckFormats from "views/CheckFormats/CheckFormats";
import DepositSlips from "views/DepositSlips/DepositSlips";
import BankBalance from "views/BankBalance/BankBalance";
import DepositSlipFormats from "views/DepositSlipFormat/DepositSlipFormat";
import Login from "views/Login/Login";
import Profile from "views/Profile/Profile";
import Logout from "views/Logout/Logout";
import DepositBalance from "views/DepositBalance/DepositBalance";
import DisbursementBalance from "views/DisbursementBalance/DisbursementBalance";
// import Rtl from "views/Rtl.js";
// import TableList from "views/TableList.js";
// import Typography from "views/Typography.js";
// import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: '/expense',
    name: 'Manual Expenses',
    icon: 'fa fa-receipt',
    component: Expenses,
    layout: '/admin'
  },
  {
    path: '/disbursement',
    name: 'Disbursements',
    icon: 'fa fa-rectangle-list',
    component: Disbursements,
    layout: '/admin'
  },
  {
    path: '/depositslips',
    name: 'Deposit Slips',
    icon: 'fa-solid fa-file-invoice-dollar',
    component: DepositSlips,
    layout: '/admin'
  },
  {
    path: '/deposits',
    name: 'Deposits',
    icon: 'fa fa-money-bill-transfer',
    component: Deposits,
    layout: '/admin'
  },
  { divider: true },
  {
    path: '/dereport',
    name: 'DE Report',
    icon: 'fa fa-chart-simple',
    component: DEReport,
    layout: '/admin'
  },
  {
    path: '/iereport',
    name: 'IE Report',
    icon: 'fa-solid fa-chart-simple',
    component: IEReport,
    layout: '/admin'
  },
  {
    path: '/ewtreport',
    name: 'EWT Report',
    icon: 'fa-solid fa-chart-simple',
    component: EWTReport,
    layout: '/admin'
  },
  {
    path: '/bankreconciliation',
    name: 'Bank Balance',
    icon: 'fa-solid fa-magnifying-glass-dollar',
    component: BankBalance,
    layout: '/admin'
  },
  {
    path: '/disbursementbalance',
    name: 'Disbursement Balance',
    icon: 'fa-solid fa-magnifying-glass-dollar',
    component: DisbursementBalance,
    layout: '/admin'
  },
  {
    path: '/depositbalance',
    name: 'Deposit Balance',
    icon: 'fa-solid fa-magnifying-glass-dollar',
    component: DepositBalance,
    layout: '/admin'
  },
  { divider: true },
  {
    path: '/suppliers',
    name: 'Suppliers',
    icon: 'fa fa-truck',
    component: Suppliers,
    layout: '/admin'
  },
  {
    path: '/users',
    name: 'Users',
    icon: 'fa fa-users',
    component: Users,
    layout: '/admin'
  },
  {
    path: '/bankaccount',
    name: 'Bank Accounts',
    icon: 'fa fa-money-check-alt',
    component: BankAccounts,
    layout: '/admin'
  },
  { divider: true },
  {
    path: '/company',
    name: 'Company',
    icon: 'fa-regular fa-building',
    component: Company,
    layout: '/admin'
  },
  {
    path: '/ewt',
    name: 'EWT',
    icon: 'fa fa-table-columns',
    component: EWTs,
    layout: '/admin'
  },
  {
    path: '/banks',
    name: 'Banks',
    icon: 'fa fa-building-columns',
    component: Banks,
    layout: '/admin'
  },
  {
    path: '/itemcode',
    name: 'Item Code',
    icon: 'fa fa-bars-staggered',
    component: ItemCodes,
    layout: '/admin'
  },
  {
    path: '/checkformat',
    name: 'Check Format',
    icon: 'fa fa-money-check-dollar',
    component: CheckFormats,
    layout: '/admin'
  },
  {
    path: '/depositSlipFormat',
    name: 'Deposit Slip Format',
    icon: 'fa fa-file-pen',
    component: DepositSlipFormats,
    layout: '/admin'
  },
  {
    path: '/roles',
    name: 'Roles',
    icon: 'fa fa-user-tag',
    component: Roles,
    layout: '/admin'
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'fa fa-user-tag',
    hidden: true,
    component: Login,
    layout: '/auth'
  },
  {
    path: '/logout',
    name: 'Logout',
    icon: 'fa fa-user-tag',
    hidden: true,
    component: Logout,
    layout: '/admin'
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: 'fa fa-user',
    hidden: true,
    component: Profile,
    layout: '/admin'
  },
  // { divider: true },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   rtlName: 'لوحة القيادة',
  //   icon: 'tim-icons icon-chart-pie-36',
  //   component: Dashboard,
  //   layout: '/admin'
  // },
  // {
  //   path: '/icons',
  //   name: 'Icons',
  //   rtlName: 'الرموز',
  //   icon: 'tim-icons icon-atom',
  //   component: Icons,
  //   layout: '/admin'
  // },
  // {
  //   path: '/map',
  //   name: 'Map',
  //   rtlName: 'خرائط',
  //   icon: 'tim-icons icon-pin',
  //   component: Map,
  //   layout: '/admin'
  // },
  // {
  //   path: '/notifications',
  //   name: 'Notifications',
  //   rtlName: 'إخطارات',
  //   icon: 'tim-icons icon-bell-55',
  //   component: Notifications,
  //   layout: '/admin'
  // },
  // {
  //   path: '/user-profile',
  //   name: 'User Profile',
  //   rtlName: 'ملف تعريفي للمستخدم',
  //   icon: 'tim-icons icon-single-02',
  //   component: UserProfile,
  //   layout: '/admin'
  // },
  // {
  //   path: '/tables',
  //   name: 'Table List',
  //   rtlName: 'قائمة الجدول',
  //   icon: 'tim-icons icon-puzzle-10',
  //   component: TableList,
  //   layout: '/admin'
  // },
  // {
  //   path: '/typography',
  //   name: 'Typography',
  //   rtlName: 'طباعة',
  //   icon: 'tim-icons icon-align-center',
  //   component: Typography,
  //   layout: '/admin'
  // },
  // {
  //   path: '/rtl-support',
  //   name: 'RTL Support',
  //   rtlName: 'ار تي ال',
  //   icon: 'tim-icons icon-world',
  //   component: Rtl,
  //   layout: '/rtl'
  // }
];
export default routes;
