import classNames from 'classnames';
import styles from './body-measurement.module.scss'; // we have to import it to use FC
import BarChartIcon from '@mui/icons-material/BarChart';

interface Props {
  name: string;
  value: number;
}

const BodyMeasurement: React.FC<Props> = ({ name, value }) => {
  return (
    <div className={classNames(styles.wrapper)}>
      <BarChartIcon className={classNames(styles.BarChartIcon)} />
      <div className={classNames(styles.valuesWrap)}>
        <div className={classNames(styles.name)}>{name}</div>
        <div className={classNames(styles.value)}>{value} cm</div>
      </div>
    </div>
  );
};

export default BodyMeasurement;
