import classNames from 'classnames';
import styles from './nutrient.module.scss';
import DataUsageIcon from '@mui/icons-material/DataUsage';

interface Props {
  name: string;
  value: number;
}

const Nutrient: React.FC<Props> = ({ name, value }) => {
  return (
    <section className="nutrient">
      <div className={classNames(styles.nutrientWrapper)}>
        <DataUsageIcon
          className={classNames(styles.circle)}
          style={{ fontSize: 40 }}
        />
        <div className={classNames(styles.dataWrapper)}>
          <div className={classNames(styles.value)}>{value} g</div>
          <div className={classNames(styles.title)}>{name}</div>
        </div>
      </div>
    </section>
  );
};

export default Nutrient;
