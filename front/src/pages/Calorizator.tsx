import classNames from 'classnames';
import { useState, useEffect } from 'react';
import styles from './styles/calorizator.module.scss';
import Header from 'components/header/Header';
import Founditem from '../elements/foundItem/FoundItem';
import TextField from '@mui/material/TextField';
import SearchButton from 'elements/searchButton/SearchButton';
import { Food } from '../interfaces/Food.types';
import { searchFood } from '../service/FoodDataService';
import { SearchError } from 'elements/serachError/SearchError';
import { useSearchParams } from 'react-router-dom';

const Calorizator: React.FC = () => {
  // Error display: first time OR second time
  const [lastSearchValue, setLastSearchValue] = useState(true);
  // Store 'searchValue' from input
  const [searchValue, setSearchValue] = useState<string>('');
  // Store 'foodList' from axios
  const [foodList, setFoodList] = useState<Food[]>([]);

  const [searchQuery, setSearchQuery] = useSearchParams('');

  let defaultQuery: string | null = searchQuery ? searchQuery.get('q') : '';

  const setSearchParam = (value: string) => {
    if (value) {
      setSearchQuery({ q: value });
    } else {
      searchQuery.delete('q');
      setSearchQuery(searchQuery);
    }
  };

  const loadResult = async (searchValue: string) => {
    const result = await searchFood(searchValue);

    setFoodList(result);
    setLastSearchValue(false);
    setSearchParam(searchValue);
  };

  const clearResult = () => {
    setFoodList([]);
    setSearchParam('');
    setSearchValue('');
    setLastSearchValue(true);
  };

  useEffect(() => {
    if (typeof defaultQuery === 'string' && defaultQuery.length > 0) {
      setSearchValue(defaultQuery);
      loadResult(defaultQuery);
    } else {
      clearResult();
    }
  }, [defaultQuery]);

  const startSearch = () => {
    loadResult(searchValue);
  };

  const keyPress = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      startSearch();
    }
  };

  return (
    <section className="Calorizator">
      <div className={classNames(styles.headerWrapper)}>
        <Header userName="" name="Calorizator" />
        <div className={classNames(styles.field)}>
          <TextField
            color="warning"
            fullWidth
            type="text"
            label="Search"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onKeyDown={keyPress}
            value={searchValue}
          />
          <span onClick={startSearch}>
            <SearchButton />
          </span>
        </div>
      </div>
      <div>
        <div>
          {foodList.length > 0 ? (
            <div className={classNames(styles.foundItemsWrapper)}>
              {foodList.map((foodItem: Food, i: number) => (
                <Founditem
                  data={foodItem}
                  id={foodItem.fdcId}
                  key={`card-${i}`}
                />
              ))}
            </div>
          ) : (
            <SearchError status={lastSearchValue} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Calorizator;
