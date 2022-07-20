import classNames from 'classnames';
import styles from './base-measurement.module.scss'; // we have to import it to use FC
import scale from 'assets/scale.png';

interface Props {
  name: string;
  value: number;
  color: boolean;
  valueMeasure: string;
}

const BaseMeasurement: React.FC<Props> = ({
  name,
  value,
  color,
  valueMeasure,
}) => {
  return (
    <>
      <div
        className={
          color
            ? styles.wrapper
            : classNames(styles.wrapper, styles.wrapperBlue)
        }
      >
        <div className={classNames(styles.name)}>{name}</div>
        <div className={classNames(styles.rightWrapper)}>
          <div className={classNames(styles.scale)}>
            <img alt={'scale'} src={scale} />
          </div>
          <div className={classNames(styles.value)}>
            {value} {valueMeasure}
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseMeasurement;
