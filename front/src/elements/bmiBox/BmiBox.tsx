import classNames from 'classnames';
import styles from './bmi-box.module.scss'; // we have to import it to use FC
import { useState } from 'react';
import { useAuth } from 'hooks/useAuth';

const BmiBox = () => {
  const auth = useAuth();

  const [bmi, setBmi] = useState(0);

  let height: number = auth.user?.height || 180;
  let weight: number = auth.user?.weight || 70;

  const calcBMI = () => {
    let bmi: number = weight / Math.pow(height / 100, 2);
    let rounddBmi: number = Math.round(bmi);
    setBmi(rounddBmi);
  };

  setTimeout(calcBMI, 1);

  return (
    <div className={classNames(styles.bmiBox)}>
      <div className={classNames(styles.title)}>Body Mass Index</div>
      <div className={classNames(styles.contentWrapper)}>
        <div className={classNames(styles.value)}>{bmi}</div>
        {bmi > 18 && bmi < 25 ? (
          <p className={classNames(styles.status)}>You're healthy</p>
        ) : (
          <p className={classNames(styles.status, styles.statusRed)}>
            Watch your weight
          </p>
        )}
      </div>
      <div className={classNames(styles.barWrapper)}>
        <div className={classNames(styles.bar)}></div>
        <div className={classNames(styles.barValues)}>
          <div>10</div>
          <div>20</div>
          <div>25</div>
          <div>30</div>
          <div>40</div>
        </div>
      </div>
    </div>
  );
};

export default BmiBox;
