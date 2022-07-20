import classNames from 'classnames';
import styles from './features.module.scss';

interface Props {
  value: string;
  available: boolean;
}

const Features: React.FC<Props> = ({ value, available }) => {
  return (
    <div>
      <div className={classNames(styles.wrapper)}>
        <p className={classNames(styles.title)}>{value}</p>

        {available ? (
          <p className={classNames(styles.available, styles.availableTrue)}>
            Free
          </p>
        ) : (
          <p className={classNames(styles.available, styles.availableFalse)}>
            Login
          </p>
        )}
      </div>
    </div>
  );
};

export default Features;
