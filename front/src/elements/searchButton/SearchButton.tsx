import classNames from 'classnames';
import styles from './search-button.module.scss';
import SearchIcon from '@mui/icons-material/Search';

const SearchButton = () => {
  return (
    <button className={classNames(styles.button)}>
      <SearchIcon className={classNames(styles.icon)} />
    </button>
  );
};

export default SearchButton;
