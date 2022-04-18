import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleChar: null,
  singleCharId: null,
  charLoadingStatus: 'none',
}

const charInfoSlice = createSlice({
  name: 'singleChar',
  initialState,
  reducers: {
    singleCharFetching: state => {
      state.charLoadingStatus = 'loading'
    },
    singleCharFetched: (state, action) => {
      state.charLoadingStatus = 'none';
      state.singleChar = action.payload;
    },
    singleCharFetchingError: state => {
      state.charLoadingStatus = 'error';
    },
    singleCharId: (state, action) => {
      console.log(action.payload);
      state.singleCharId = action.payload;
    }
  }
})

const { actions, reducer } = charInfoSlice;

export default reducer;
export const {
  singleCharFetching,
  singleCharFetched,
  singleCharFetchingError,
  singleCharId
} = actions;
