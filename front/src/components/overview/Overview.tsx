import classNames from 'classnames';
import styles from './overview.module.scss';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Features from 'elements/features/Features';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';

// MUI
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Images
import scroll from 'assets/scroll.svg';
import broccoli from 'assets/broccoli.svg';
import avocado from 'assets/avocado.svg';
import coffee from 'assets/coffee.svg';
import apple from 'assets/apple.svg';
import peach from 'assets/peach.svg';
import tea from 'assets/tea.svg';
import orange from 'assets/orange.png';

interface PageProps {
  offset: number;
  gradient: string;
  onClick: () => void;
}

const Overview = () => {
  const parallax = useRef<IParallax>(null!);

  return (
    <div className={classNames(styles.mainLayer)}>
      <Parallax ref={parallax} pages={3}>
        <ParallaxLayer
          offset={0.5}
          speed={1}
          className={classNames(styles.layer1)}
        />

        <ParallaxLayer
          offset={2}
          speed={1}
          className={classNames(styles.layer2)}
        />

        <ParallaxLayer
          offset={0}
          speed={0}
          factor={3}
          style={{
            opacity: 0.1,
          }}
        >
          <img
            alt="scroll"
            src={scroll}
            style={{
              width: '20%',
              marginLeft: '30%',
              marginTop: '30%',
            }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.8}
          className={classNames(styles.parallaxLayer)}
          style={{
            opacity: 0.1,
          }}
        >
          <img
            alt="coffee"
            src={coffee}
            style={{ width: '20%', marginLeft: '70%' }}
          />
          <img
            alt="apple"
            src={apple}
            style={{ width: '20%', marginRight: '75%' }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.2 }}>
          <img
            alt="peach"
            src={peach}
            style={{ width: '20%', marginLeft: '55%' }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.2}
          className={classNames(styles.broccoli)}
        >
          <img
            src={broccoli}
            alt="broccoli"
            style={{ width: '10%', marginLeft: '10%' }}
          />
          <img
            src={avocado}
            alt="avocado"
            style={{ width: '20%', marginLeft: '75%' }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img
            alt="orange"
            src={orange}
            style={{ width: '25%', marginLeft: '30%' }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          className={classNames(styles.layerBottom)}
          offset={2.6}
          speed={0.4}
          style={{ opacity: 0.5 }}
        >
          <img
            alt="tea"
            src={tea}
            style={{ width: '20%', marginLeft: '10%' }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1)}
          className={classNames(styles.parallaxLayer)}
        >
          <h3 className={classNames(styles.title)}>
            Click to learn more about the app!
          </h3>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.5}
          onClick={() => parallax.current.scrollTo(2)}
          className={classNames(styles.parallaxLayer)}
        >
          <div className={classNames(styles.featuresWrapper)}>
            <h3 className={classNames(styles.title)}>Features</h3>
            <Features value="Browse foods" available={true} />
            <Features value="Nutrient reports" available={true} />
            <Features value="Use shopping list" available={false} />
            <Features value="Calculate BMI" available={false} />
            <Features value="Manage account" available={false} />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0}
          className={classNames(styles.parallaxLayer)}
          onClick={() => parallax.current.scrollTo(0)}
        >
          <div className={classNames(styles.featuresWrapper)}>
            <h3 className={classNames(styles.title)}>
              Join to get fit & healthy!
            </h3>
            <Link to="/calorizator">
              <Button
                type="submit"
                color="warning"
                variant="outlined"
                size="large"
                startIcon={<SearchIcon />}
              >
                Browse foods
              </Button>
            </Link>

            <Link to="/account">
              <Button
                type="submit"
                color="warning"
                variant="outlined"
                size="large"
                startIcon={<AccountCircleIcon />}
              >
                Go to account
              </Button>
            </Link>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Overview;
