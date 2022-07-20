import Header from 'components/header/Header';
import Overview from 'components/overview/Overview';
import { useAuth } from 'hooks/useAuth';

const Main = () => {
  let auth = useAuth();

  return (
    <div className="Main">
      <Header
        userName={`${auth.user ? auth.user.userName : 'Guest'}'s `}
        name="Overview"
      />
      <div>
        <Overview />
      </div>
    </div>
  );
};

export default Main;
