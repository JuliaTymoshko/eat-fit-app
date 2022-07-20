import classNames from 'classnames';
import styles from './header.module.scss'; // we have to import it to use FC
import moment from 'moment';

interface Props {
  name: string;
  userName: string;
}

const Header: React.FC<Props> = ({ name, userName }) => {
  let day = moment().format(`dddd, MMMM Do`);

  return (
    <div className={classNames(styles.header)}>
      <h1 className={classNames(styles.title)}>
        {userName}
        {name}
      </h1>
      <p className={classNames(styles.subtitle)}>{day}</p>
    </div>
  );
};

export default Header;
