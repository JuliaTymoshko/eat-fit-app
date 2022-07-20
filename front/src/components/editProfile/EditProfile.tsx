import classNames from 'classnames';
import styles from './edit-profile.module.scss';
import { useState } from 'react';
import { useAuth } from 'hooks/useAuth';

// MUI
import { Button, Divider, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import HowToRegIcon from '@mui/icons-material/HowToReg';

// Formik & Validation
import { useFormik } from 'formik';
import { validationSchema } from 'data/validationEditProfile';

// Components
import Modal from 'components/modal/Modal';

interface IEditForm {
  weight: number | string;
  height: number | string;
  hips: number | string;
  waist: number | string;
  chest: number | string;
}

const EditProfile = () => {
  const auth = useAuth();

  const [display, setDisplay] = useState(false);

  const URL = '/api/users/edit';

  const matches = useMediaQuery('(max-width: 480px)');

  const formik = useFormik({
    initialValues: {
      weight: auth.user?.weight || '',
      height: auth.user?.height || '',
      hips: auth.user?.charachteristics.hips || '',
      waist: auth.user?.charachteristics.waist || '',
      chest: auth.user?.charachteristics.chest || '',
    },

    validationSchema: validationSchema,

    onSubmit: (values: IEditForm, { setValues }) => {
      const headers = new Headers();
      const token = localStorage.getItem('authToken') || '';

      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);

      fetch(URL, {
        method: 'PUT',
        mode: 'cors',
        headers,
        body: JSON.stringify({
          weight: +values.weight,
          height: +values.height,
          hips: +values.hips,
          waist: +values.waist,
          chest: +values.chest,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          setDisplay(true);

          if (response) {
            setValues({
              weight: response.data.weight || '',
              height: response.data.height || '',
              hips: response.data.charachteristics.hips || '',
              waist: response.data.charachteristics.waist || '',
              chest: response.data.charachteristics.chest || '',
            });
          }
        });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Divider className={classNames(styles.divider)}>Edit your data</Divider>
        <div className={classNames(styles.reqFieldsWrapper)}>
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
          />
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
          />
        </div>

        <Button
          aria-label="Save"
          type="submit"
          color="warning"
          variant="outlined"
          size="large"
          endIcon={<HowToRegIcon />}
        >
          Save
        </Button>
      </form>
      <>
        {display && (
          <div>
            <Modal
              messageType="Congrats!"
              close={() => setDisplay(false)}
              message="Successfuly updated"
            />
          </div>
        )}
      </>
    </div>
  );
};

export default EditProfile;
