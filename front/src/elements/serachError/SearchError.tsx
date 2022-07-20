import classNames from 'classnames';
import styles from './search-error.module.scss';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

interface Props {
  status: boolean;
}

export const SearchError: React.FC<Props> = ({ status }) => {
  if (status === true) {
    return (
      <div className="searchError">
        <div className={classNames(styles.wrapper)}>
          <AutoFixHighIcon className={classNames(styles.icon)} />
          Simply start searching!
        </div>
      </div>
    );
  } else {
    return (
      <div className="searchError">
        <div className={classNames(styles.wrapper)}>
          <ErrorOutlineIcon className={classNames(styles.icon)} />
          Result not found. Please check the spelling or try alternative product
          names.
        </div>
      </div>
    );
  }
};
