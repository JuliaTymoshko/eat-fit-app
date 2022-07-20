import 'styles/index.scss';
import baseStyles from 'styles/base.module.scss';
import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import classNames from 'classnames';
import Drawer from 'components/drawer/Drawer';
import Main from 'pages/Main';
import NutritionCard2 from 'components/nutrition-card/NutritionCard2';
import BMI from 'components/bmi/BMI';
import Account from 'pages/Account';
import Registration from 'pages/Registration';
import Login from 'pages/Login';
import { AuthProvider } from 'components/providers/AuthProvider';
import { useAuth } from 'hooks/useAuth';
import LinearProgress from '@mui/material/LinearProgress';

const Calorizator = lazy(() => import('./pages/Calorizator'));
const ShoppingList = lazy(() => import('./pages/ShoppingList'));

const App: React.FC = () => {
  function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
      return <Navigate to="/account" state={{ from: location }} replace />;
    }

    return children;
  }

  return (
    <AuthProvider>
      <div className={classNames(baseStyles.app)}>
        <div className={classNames(baseStyles.container)}>
          <Drawer />

          <div className="content">
            <Suspense fallback={<LinearProgress color="warning" />}>
              <Routes>
                <Route path="/" element={<Main />} />

                <Route path="/calorizator" element={<Calorizator />} />

                <Route
                  path="/calorizator/product-deails/:id"
                  element={<NutritionCard2 />}
                />

                <Route
                  path="/shopping-list"
                  element={
                    <RequireAuth>
                      <ShoppingList />
                    </RequireAuth>
                  }
                />
                <Route path="/account" element={<Account />} />
                <Route path="/account/register" element={<Registration />} />
                <Route path="/account/login" element={<Login />} />
              </Routes>
            </Suspense>
          </div>
        </div>
        <BMI />
      </div>
    </AuthProvider>
  );
};

export default App;
