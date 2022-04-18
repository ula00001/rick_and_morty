import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  randomChar: null,
  randomCharId: 1,
  randomCharLoadingStatus: 'none',
}

const charInfoSlice = createSlice({
  name: 'randomChar',
  initialState,
  reducers: {
    randomCharFetching: state => {
      state.randomCharLoadingStatus = 'loading'
    },
    randomCharFetched: (state, action) => {
      console.log(action.payload);
      state.randomCharLoadingStatus = 'none';
      state.randomChar = action.payload;
    },
    randomCharFetchingError: state => {
      state.randomCharLoadingStatus = 'error';
    },
    setRandomCharId: (state, action) => {
      console.log(action.payload);
      state.randomCharId = action.payload;
    }
  }
})

const { actions, reducer } = charInfoSlice;

export default reducer;
export const {
  randomCharFetching,
  randomCharFetched,
  randomCharFetchingError,
  setRandomCharId,
} = actions;
