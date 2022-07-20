import classNames from 'classnames';
import Header from 'components/header/Header';
import ShoppingItem from 'elements/shoppingItem/ShoppingItem';
import ShoppingListStyles from './styles/shopping-list.module.scss';
import TextField from '@mui/material/TextField';
import AddTaskIcon from '@mui/icons-material/AddTask';
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  KeyboardEvent,
} from 'react';
import { IToBuyItem } from 'interfaces/ToBuyItem.types';
import { useAuth } from 'hooks/useAuth';

const ShoppingList = () => {
  let auth = useAuth();

  const [toBuyText, setToBuyText] = useState('');
  const [label, setLabel] = useState('What do you want to buy?');
  const [shoppingList, setShoppingList] = useState<IToBuyItem[]>(
    JSON.parse(localStorage.getItem('shoppingItems') || '[]')
  );

  const сheckSpaces = (str: string) => str.trim() !== ''; // ? проверка на ввод нескольких пробелов

  const addItem = (e: FormEvent<HTMLButtonElement> | KeyboardEvent): void => {
    e.preventDefault();

    if (toBuyText && сheckSpaces(toBuyText)) {
      if (toBuyText.length < 70) {
        let updatedArray = [...shoppingList];
        updatedArray.push({
          todo: {
            value: toBuyText,
            checked: false,
            id: shoppingList.length + 1,
          },
        });
        setShoppingList(updatedArray);
        setToBuyText('');
        setLabel('What do you want to buy?');
      } else {
        setLabel('Try a bit shorter');
        setToBuyText('');
      }
    } else {
      setLabel('First type smth');
      setToBuyText('');
    }
  };

  const removeItem = (id: string | number): void => {
    const newList = shoppingList.filter((item) => item.todo.id !== id);
    setShoppingList(newList);
  };

  const keyPress = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      addItem(e);
    }
  };

  // add to LocalStorage
  useEffect(() => {
    localStorage.setItem('shoppingItems', JSON.stringify(shoppingList));
  }, [shoppingList]);

  return (
    <section className={classNames(ShoppingListStyles.shoppingList)}>
      <div className={classNames(ShoppingListStyles.header)}>
        <Header
          userName={`${auth.user ? auth.user.userName : 'Guest'}'s `}
          name="Shopping"
        />
      </div>
      <div className={classNames(ShoppingListStyles.input)}>
        <TextField
          value={toBuyText}
          label={label}
          color="warning"
          type="text"
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setToBuyText(e.target.value);
          }}
          onKeyDown={keyPress}
        />
        <button
          className={classNames(ShoppingListStyles.button)}
          onClick={addItem}
        >
          <AddTaskIcon style={{ fontSize: 40, color: '#e8e7e7' }} />
        </button>
      </div>

      <div
        id="container"
        className={classNames(ShoppingListStyles.itemsWrapper)}
      >
        {shoppingList.map((item, i) => (
          <ShoppingItem
            key={`tobuy-${i}`}
            item={item}
            deleteItem={removeItem}
          />
        ))}
      </div>
    </section>
  );
};

export default ShoppingList;
