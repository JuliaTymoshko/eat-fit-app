import classNames from 'classnames';
import styles from './founditem.module.scss';
import { Food } from '../../interfaces/Food.types';
import { Link } from 'react-router-dom';
import 'animate.css';

// musthave to write interface for props in every components + FC wrapper is needed !
interface Props {
  data: Food;
  id: string | number;
}

const Founditem: React.FC<Props> = ({ data, id }) => {
  return (
    <div
      className={classNames(
        styles.foundItem,
        'animate__animated',
        'animate__fadeIn',
        'animate__faster'
      )}
    >
      <Link to={`product-deails/${id}`}>
        <div className={classNames(styles.wrapper)}>
          <p className={classNames(styles.title)}>{data.description}</p>

          <p className={classNames(styles.category)}>{data.foodCategory}</p>

          <p className={classNames(styles.kcalValue)}>
            {data.foodNutrients[3].value + ' kCal'}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Founditem;
