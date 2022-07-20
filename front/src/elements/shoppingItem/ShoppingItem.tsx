import classNames from 'classnames';
import styles from './shopping-item.module.scss';
import { Checkbox } from '@mui/material';
import { IToBuyItem } from 'interfaces/ToBuyItem.types';
import 'animate.css';

interface Props {
  item: IToBuyItem;
  deleteItem(id: number): void;
}

const ShoppingItem: React.FC<Props> = ({ item, deleteItem }) => {
  return (
    <section className={classNames(styles.foundItem)}>
      <div
        className={classNames(
          styles.wrapper,
          'animate__animated',
          'animate__fadeIn',
          'animate__faster'
        )}
      >
        <Checkbox
          sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
          color="default"
          onClick={() => deleteItem(item.todo.id)}
          checked={item.todo.checked}
        />
        <p className={classNames(styles.description)}>{item.todo.value}</p>
      </div>
    </section>
  );
};

export default ShoppingItem;
