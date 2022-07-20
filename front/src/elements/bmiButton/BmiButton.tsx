import classNames from 'classnames';
import styles from './bmi-button.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface Props {
  close(): void;
}

const BmiButton: React.FC<Props> = ({ close }) => {
  return (
    <>
      <div className={classNames(styles.wrapper)} onClick={() => close()}>
        <button className={classNames(styles.button)}>
          <ArrowBackIosIcon className={classNames(styles.icon)} />
        </button>
      </div>
    </>
  );
};

export default BmiButton;
