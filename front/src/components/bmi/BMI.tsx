import classNames from 'classnames';
import styles from './bmi.module.scss';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';

import BaseMeasurement from 'elements/baseMeasurement/BaseMeasurement';
import BodyMeasurement from 'elements/bodyMeasurement/BodyMeasurement';
import BmiButton from 'elements/bmiButton/BmiButton';
import BmiBox from 'elements/bmiBox/BmiBox';

import { ReactComponent as Body } from 'assets/body.svg';

const BMI = () => {
  const auth = useAuth();
  const [display, setDisplay] = useState(true);

  return (
    <div
      className={classNames(
        styles.bmiBase,
        display ? styles.bmiVisible : styles.bmiHidden
      )}
    >
      <h2 className={classNames(styles.title)}>BMI Calculator</h2>

      <div className={classNames(styles.contentWrapper)}>
        <div className={classNames(styles.baseMeasurementsWrapper)}>
          <BaseMeasurement
            name="Height"
            value={auth.user ? auth.user.height : 180}
            color={false}
            valueMeasure={'cm'}
          />
          <BaseMeasurement
            name="Weight"
            value={auth.user ? auth.user.weight : 70}
            color={true}
            valueMeasure={'kg'}
          />
        </div>

        <BmiBox />
      </div>

      <div className={classNames(styles.buttonParent)}>
        <BmiButton close={() => setDisplay(!display)} />
        <hr className={classNames(styles.divider)} />
      </div>

      <div className={classNames(styles.downWrapper)}>
        <div className={classNames(styles.downContentWrapper)}>
          <h2 className={classNames(styles.title)}>Body Measurements</h2>
          <div className={classNames(styles.measurementsWrapper)}>
            <BodyMeasurement
              name="Chest"
              value={auth.user ? auth.user.charachteristics.chest : 90}
            />
            <BodyMeasurement
              name="Waist"
              value={auth.user ? auth.user.charachteristics.waist : 60}
            />
            <BodyMeasurement
              name="Hip"
              value={auth.user ? auth.user.charachteristics.hips : 90}
            />
          </div>
        </div>
        <Body className={classNames(styles.body)} />
      </div>
    </div>
  );
};

export default BMI;
