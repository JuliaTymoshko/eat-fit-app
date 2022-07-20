import { environment } from './../data/environment';
import axios from 'axios';

export const searchFood = (searchValue: string | URLSearchParams) => {
  const URL = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchValue}&pageSize=6&api_key=${environment.API_KEY}&dataType=${environment.dataType}`;
  return axios.get(URL).then((data) => data.data.foods);
};

export const getFoodByID = (foodID: string | undefined) => {
  const URL = `https://api.nal.usda.gov/fdc/v1/food/${foodID}?format=abridged&api_key=bAmohR9dnN5XKOMyV4fzNi4xRFsvkAZf2K06nzcJ`;
  return axios.get(URL).then((data) => data.data);
};
