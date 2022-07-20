import classNames from 'classnames';
import styles from './nutrition-card.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getFoodByID } from './../../service/FoodDataService';
import { NutrientType } from '../../interfaces/Nutrient.types';

// Elements
import NutritionCard from './NutritionCard';
// MUI
import { LinearProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NutritionCard2 = () => {
  const params = useParams();

  let foodID = params.id;

  const [food, setFood] = useState<NutrientType | null>(null);

  const loadNutrients = async () => {
    const result = await getFoodByID(foodID);
    setFood(result);
  };

  useEffect(() => {
    loadNutrients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  if (food) {
    return (
      <div className={classNames(styles.resultWrapper)}>
        <ArrowBackIcon
          onClick={() => navigate(-1)}
          fontSize="large"
          className={classNames(styles.back)}
        />
        <NutritionCard data={food} />
      </div>
    );
  }
  return (
    <section className="nutritionCard">
      <LinearProgress color="warning" />
    </section>
  );
};

export default NutritionCard2;
