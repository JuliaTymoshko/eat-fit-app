import classNames from 'classnames';
import styles from './login-form.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from 'hooks/useAuth';

// MUI
import { Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

// formik & validation
import { useFormik } from 'formik';
import { validationSchema } from 'data/validationLogin';

interface InitialValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const auth = useAuth();

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const URL = '/api/users/login';
  const navigate = useNavigate();

  const initialValues: InitialValues = { email: '', password: '' };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: InitialValues) => {
      setEmailError('');
      setPasswordError('');

      fetch(URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.message === 'Password incorrect') {
            setPasswordError(response.message);
            return;
          }
          if (response.message === 'No user with such email') {
            setEmailError(response.message);
            return;
          }

          if (response.success && response.user) {
            auth.signin(response.token, () => navigate('/'));
          }
        });
    },
  });

  return (
    <div className={classNames(styles.wrapper)}>
      <form onSubmit={formik.handleSubmit}>
        <div className={classNames(styles.fieldsWrapper)}>
          <TextField
            className={classNames(styles.field)}
            label="Email"
            name="email"
            id="email"
            color="warning"
            type="text"
            required
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.password ? emailError : ' '}
          />
          <TextField
            className={classNames(styles.field)}
            label="Password"
            color="warning"
            type="password"
            name="password"
            id="password"
            required
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password ? passwordError : ' '}
          />
          <Button
            className={classNames(styles.button)}
            type="submit"
            color="warning"
            variant="outlined"
            size="large"
            endIcon={<LoginIcon />}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
