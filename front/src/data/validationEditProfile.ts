import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  weight: Yup.number()
    .typeError('Weight must be a number')
    .required('Required')
    .integer('Please use only round numbers')
    .min(10, "Smth is wrong.. You're way too small")
    .max(500, "Smth is wrong.. You're way too big"),
  //
  height: Yup.number()
    .typeError('Height must be a number')
    .required('Required')
    .integer('Please use only round numbers')
    .min(60, "Smth is wrong.. You're way too short")
    .max(250, "Smth is wrong.. You're way too tall"),
  //
  chest: Yup.number()
    .typeError('Chest must be a number')
    .integer('Please use only round numbers')
    .min(30, 'Smth is wrong.. Chest is too small')
    .max(170, 'Smth is wrong..  Chest is too big'),
  //
  waist: Yup.number()
    .typeError('Waist must be a number')
    .integer('Please use only round numbers')
    .min(30, 'Smth is wrong.. Waist is too small')
    .max(300, 'Smth is wrong..  Waist is too big'),
  //
  hips: Yup.number()
    .typeError('Hips must be a number')
    .integer('Please use only round numbers')
    .min(30, 'Smth is wrong.. Hips are too small')
    .max(240, 'Smth is wrong..  Hips are too big'),
  //
});
