import Home from '~/pages/Home/Home';
import Information from '~/pages/Information/Information';
import Login from '~/pages/Login/Login';
import Index from '~/pages/Register/Index';
import FormRegister from '~/pages/Register/FormRegister';
import InvoicesReceipts from '~/pages/InvoicesReceipts/InvoicesReceipts';
import ExtendedStay from '~/pages/ExtendedStay/ExtendedStay';
import Update from '~/pages/Update/Update';
import EditPassWord from '~/pages/Edit/EditPass';

const publicRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/student-info',
    component: Information,
  },
  {
    path: '/login',
    component: Login,
    layout: null,
  },
  {
    path: '/register/index',
    component: Index,
    layout: null,
  },
  {
    path: '/register/form-register',
    component: FormRegister,
    layout: null,
  },
  {
    path: '/student/invoices-receipts',
    component: InvoicesReceipts,
  },
  {
    path: '/student/extended-stay',
    component: ExtendedStay,
  },
  {
    path: '/edit-password',
    component: EditPassWord,
  },
  {
    path: '/update',
    component: Update,
  },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
