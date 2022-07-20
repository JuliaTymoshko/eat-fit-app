import { Button } from '@mui/material';
import classNames from 'classnames';
import Header from 'components/header/Header';
import accountStyles from './styles/account.module.scss';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import EditProfile from 'components/editProfile/EditProfile';

const Registration = () => {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return (
      <div>
        <div className={classNames(accountStyles.header)}>
          <Header userName="" name="Got an account?" />
        </div>
        <div className={classNames(accountStyles.buttons)}>
          <Link to="/account/login">
            <Button
              size="large"
              fullWidth
              color="warning"
              variant="outlined"
              endIcon={<LoginIcon />}
            >
              Log In
            </Button>
          </Link>
          <Link to="/account/register">
            <Button
              size="large"
              fullWidth
              color="warning"
              variant="outlined"
              endIcon={<HowToRegIcon />}
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className={classNames(accountStyles.header)}>
          <Header userName="" name="Account" />
        </div>
        <div className={classNames(accountStyles.buttons)}>
          <Button
            onClick={() => {
              auth.signout(() => navigate('/'));
            }}
            size="large"
            fullWidth
            color="warning"
            variant="outlined"
            endIcon={<LoginIcon />}
          >
            Log Out
          </Button>
          <EditProfile />
        </div>
      </div>
    );
  }
};

export default Registration;
