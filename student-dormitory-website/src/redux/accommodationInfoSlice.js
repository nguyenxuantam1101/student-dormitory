import { createSlice } from '@reduxjs/toolkit';

const accommodationInfoSlice = createSlice({
  name: 'accommodationInfo',
  initialState: {
    accommodationInfo: {
      dataAccommodation: null,
      isFetching: false,
      error: false,
    },
    message: '',
  },
  reducers: {
    getAccommodationInfoStart: (state) => {
      state.accommodationInfo.isFetching = true;
    },
    getAccommodationInfoSuccess: (state, action) => {
      state.accommodationInfo.isFetching = false;
      state.accommodationInfo.dataAccommodation = action.payload;
    },
    getAccommodationInfoFailed: (state) => {
      state.accommodationInfo.isFetching = false;
      state.accommodationInfo.error = true;
    },
  },
});

export const { getAccommodationInfoStart, getAccommodationInfoSuccess, getAccommodationInfoFailed } =
  accommodationInfoSlice.actions;

export default accommodationInfoSlice.reducer;
