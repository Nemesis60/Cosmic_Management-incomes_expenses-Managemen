import { Routes, Route } from 'react-router-dom';

import DashboardLayout from './components/dashboardLayout';
import Expenses from './pages/expenses';
import Home from './pages/home';
import Profile from './pages/profile'
import Incomes from './pages/incomes';
import Users from './pages/users';
import ViewExpense from './pages/viewExpense';
import ViewIncome from './pages/viewIncome';
import Contact from './pages/contact';

import AuthUsers from './utils/authUsers';
import FeedBack from './pages/feedBack';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<AuthUsers />}>
          <Route element={<DashboardLayout />} >
            <Route path='/dashboard/:userId' element={<Profile />} />

            <Route path='/dashboard/users' element={<Users />} />

            <Route path='/dashboard/incomes' element={<Incomes />} />
            <Route path='/dashboard/incomes/:incomeId' element={<ViewIncome />} />

            <Route path='/dashboard/expenses' element={<Expenses />} />
            <Route path='/dashboard/expenses/:expenseId' element={<ViewExpense />} />

            <Route path='/dashboard/contact' element={<Contact />} />
            <Route path='/dashboard/feedback' element={<FeedBack />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
