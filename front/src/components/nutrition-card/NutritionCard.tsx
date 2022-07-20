import classNames from 'classnames';
import styles from './nutrition-card.module.scss';
import { NutrientType } from '../../interfaces/Nutrient.types';

// Elements
import Nutrient from '../../elements/nutrient/Nutrient';
import Upline from '../../elements/upline/Upline';

// MUI
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';

interface Props {
  data: NutrientType;
}

const NutritionCard: React.FC<Props> = ({ data }) => {
  return (
    <section className={classNames(styles.nutritionCard)}>
      <div className={classNames(styles.cardWrapper)}>
        <div className={classNames(styles.upline)}>
          <Upline />
        </div>

        <div className={classNames(styles.circle)}>
          <div className={classNames(styles.circleWrapper)}>
            <div className={classNames(styles.circleBg)}>
              <div className={classNames(styles.circleInnerContent)}>
                <BoltOutlinedIcon
                  className={classNames(styles.circleFlash)}
                  style={{ fontSize: 50 }}
                />
                <div className={classNames(styles.circleValue)}>
                  {data.foodNutrients[3].amount} kCal
                </div>
              </div>
            </div>
          </div>

          <div className={classNames(styles.nutrientsWrapper)}>
            <Nutrient
              name="Carbohydrate"
              value={data.foodNutrients[2].amount}
            />
            <Nutrient name="Protein" value={data.foodNutrients[0].amount} />
            <Nutrient name="Fiber" value={data.foodNutrients[9].amount} />
            <Nutrient
              name="Fatty acids"
              value={data.foodNutrients[43].amount}
            />
          </div>
        </div>

        <div className={classNames(styles.descriptionWrapper)}>
          <h3 className={classNames(styles.nutrientTitle)}>Food</h3>
          <p className={classNames(styles.nutrientDescription)}>
            {data.description}
          </p>

          <h3 className={classNames(styles.nutrientTitle)}>Data source</h3>
          <p className={classNames(styles.nutrientDescription)}>
            {data.dataType}
          </p>
        </div>
      </div>
    </section>
  );
};

export default NutritionCard;

// https://prnt.sc/rkeDbZW5u5FY - item = получаем обьект FOOD,который в себе содержит кучу инфы. Уже к этому обьекту обращаемся к нужным полям
