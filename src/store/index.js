import { configureStore } from '@reduxjs/toolkit'
import charList from '../components/charList/charListSlice';
import singleChar from '../components/charInfo/charInfoSlice';
import randomChar from '../components/randomChar/randomCharSlice'
import logger from 'redux-logger'

const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action,
    })
  }

  return next(action);
}

const store = configureStore({
  reducer: { charList: charList, singleChar: singleChar, randomChar: randomChar},
  middleware: getDefaultMiddleware =>  getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NOVE_ENV !== 'production',
})

export default store;