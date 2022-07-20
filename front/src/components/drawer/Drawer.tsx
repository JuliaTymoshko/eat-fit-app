import classNames from 'classnames';
import styles from './drawer.module.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Elements
import { ReactComponent as Logo } from 'assets/logo.svg';

const Drawer = () => {
  const [active, setActive] = useState(false);

  const showSidebar = (e: React.MouseEvent<HTMLElement>) => {
    setActive((current) => !current);
  };

  let activeClass: React.CSSProperties = {
    color: '#d38f35',
  };

  return (
    <nav className={classNames(styles.drawer, active ? styles.drawerOpen : '')}>
      <div className={classNames(styles.logoWrapper)} onClick={showSidebar}>
        <Logo className={classNames(styles.logo)} />
      </div>

      <nav className={classNames(styles.navigation)}>
        <ul className={classNames(styles.navigationList)}>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeClass : {})}
            className={classNames(styles.navigationLink)}
          >
            <DashboardIcon className={classNames(styles.navigationIcon)} />
            <li className={classNames(styles.navigationItem)}>
              Heath Overview
            </li>
          </NavLink>

          <NavLink
            to="/calorizator"
            style={({ isActive }) => (isActive ? activeClass : {})}
            className={classNames(styles.navigationLink)}
          >
            <SearchIcon className={classNames(styles.navigationIcon)} />
            <li className={classNames(styles.navigationItem)}>Calorizator</li>
          </NavLink>

          <NavLink
            to="/shopping-list"
            style={({ isActive }) => (isActive ? activeClass : {})}
            className={classNames(styles.navigationLink)}
          >
            <ShoppingCartIcon className={classNames(styles.navigationIcon)} />
            <li className={classNames(styles.navigationItem)}>Shopping List</li>
          </NavLink>

          <NavLink
            to="/account"
            style={({ isActive }) => (isActive ? activeClass : {})}
            className={classNames(styles.navigationLink)}
          >
            <AccountCircleIcon className={classNames(styles.navigationIcon)} />
            <li className={classNames(styles.navigationItem)}>Account</li>
          </NavLink>

          <NavLink
            to="/settings"
            style={({ isActive }) => (isActive ? activeClass : {})}
            className={classNames(styles.navigationLink)}
          >
            <SettingsIcon className={classNames(styles.navigationIcon)} />
            <li className={classNames(styles.navigationItem)}>Settings</li>
          </NavLink>
        </ul>
      </nav>
    </nav>
  );
};

export default Drawer;
