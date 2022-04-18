import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  charList: [],
  charListLoadingStatus: 'none',
}

const charListSlice = createSlice({
  name: 'charList',
  initialState,
  reducers: {
    charsFetching: state => {
      state.charListLoadingStatus = 'loading'
    },
    charsFetched: (state, action) => {
      state.charListLoadingStatus = 'none';
      state.charList = action.payload;
    },
    charsFetchingError: state => {
      state.charListLoadingStatus = 'error';
    },
  }
})

const { actions, reducer } = charListSlice;

export default reducer;
export const {
  charsFetching,
  charsFetched,
  charsFetchingError,
} = actions;
