import classNames from 'classnames';
import styles from './registration-form.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

// Elements
import Modal from 'components/modal/Modal';

// MUI
import { Button, Divider, TextField } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import useMediaQuery from '@mui/material/useMediaQuery';

// formik & validation
import { useFormik } from 'formik';
import { validationSchema } from 'data/validation';

const RegistrationForm = () => {
  const URL = '/api/users/registration';

  const matches = useMediaQuery('(max-width: 480px)');

  const [errMessage, setErrMessage] = useState(' ');
  const [display, setDisplay] = useState(false);
  let auth = useAuth();
  let navigate = useNavigate();

  interface IRegValues {
    userName: string;
    email: string;
    password: string;
    matchPassword: string;
    weight: string | number;
    height: string | number;
    hips: string | number;
    waist: string | number;
    chest: string | number;
  }

  const formik = useFormik({
    // init vvalues interface
    initialValues: {
      userName: '',
      email: '',
      password: '',
      matchPassword: '',
      weight: '',
      height: '',
      hips: '',
      waist: '',
      chest: '',
    },

    validationSchema: validationSchema,

    onSubmit: (values: IRegValues) => {
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
          setErrMessage(response.message);

          if (response.success) {
            auth.signin(response.token, () => navigate('/'));
          } else {
            setDisplay(true);
          }
        });
    },
  });

  return (
    <div className={classNames(styles.wrapper)}>
      <form onSubmit={formik.handleSubmit}>
        <div className={classNames(styles.reqFieldsWrapper)}>
          <TextField
            size={matches ? 'small' : 'medium'}
            className={classNames(styles.field)}
            label="Username"
            color="warning"
            type="text"
            name="userName"
            id="userName"
            required
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName ? formik.errors.userName : ''}
          />

          <TextField
            size={matches ? 'small' : 'medium'}
            className={classNames(styles.field)}
            label="Email"
            name="email"
            id="email"
            color="warning"
            type="text"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email ? formik.errors.email : ''}
          />

          <TextField
            size={matches ? 'small' : 'medium'}
            className={classNames(styles.field)}
            label="Password"
            color="warning"
            type="password"
            name="password"
            id="password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password ? formik.errors.password : ' '}
          />

          <TextField
            size={matches ? 'small' : 'medium'}
            className={classNames(styles.field)}
            label="Repeat password"
            color="warning"
            type="password"
            name="matchPassword"
            id="matchPassword"
            required
            value={formik.values.matchPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.matchPassword &&
              Boolean(formik.errors.matchPassword)
            }
            helperText={
              formik.touched.matchPassword ? formik.errors.matchPassword : ' '
            }
          />

          <TextField
            size={matches ? 'small' : 'medium'}
            className={classNames(styles.field)}
            label="Your weight (kg)"
            color="warning"
            type="text"
            name="weight"
            id="weight"
            required
            value={formik.values.weight}
            onChange={formik.handleChange}
            error={formik.touched.weight && Boolean(formik.errors.weight)}
            helperText={formik.touched.weight ? formik.errors.weight : ' '}
          />

          <TextField
            size={matches ? 'small' : 'medium'}
            className={classNames(styles.field)}
            label="Your height (cm)"
            color="warning"
            type="text"
            name="height"
            required
            value={formik.values.height}
            onChange={formik.handleChange}
            error={formik.touched.height && Boolean(formik.errors.height)}
            helperText={formik.touched.height ? formik.errors.height : ' '}
          />
        </div>

        <Divider className={classNames(styles.divider)}>Optional</Divider>

        <div className={classNames(styles.unreqFieldsWrapper)}>
          <TextField
            size={matches ? 'small' : 'medium'}
            className={classNames(styles.field)}
            label="Chest (cm)"
            color="warning"
            type="text"
            name="chest"
            value={formik.values.chest}
            onChange={formik.handleChange}
            error={formik.touched.chest && Boolean(formik.errors.chest)}
            helperText={formik.touched.chest ? formik.errors.chest : ' '}
          />

          <TextField
            size={matches ? 'small' : 'medium'}
            className={classNames(styles.field)}
            label="Waist (cm)"
            color="warning"
            type="text"
            name="waist"
            value={formik.values.waist}
            onChange={formik.handleChange}
            helperText={formik.touched.waist ? formik.errors.waist : ' '}
          />

          <TextField
            size={matches ? 'small' : 'medium'}
            className={classNames(styles.field)}
            label="Hips (cm)"
            color="warning"
            type="text"
            name="hips"
            value={formik.values.hips}
            onChange={formik.handleChange}
            error={formik.touched.hips && Boolean(formik.errors.hips)}
            helperText={formik.touched.hips ? formik.errors.hips : ' '}
          />
        </div>
        <Button
          type="submit"
          color="warning"
          variant="outlined"
          size="large"
          endIcon={<HowToRegIcon />}
        >
          Register
        </Button>
      </form>
      <>
        {display && (
          <div>
            <Modal
              close={() => setDisplay(false)}
              message={errMessage}
              messageType="Warning"
            />
          </div>
        )}
      </>
    </div>
  );
};

export default RegistrationForm;
