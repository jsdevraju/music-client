import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  artistFilter: string;
  languageFilter: string;
  albumFilter: string;
  filterTerm: string;
}

const initialState: FilterState = {
  artistFilter: "",
  languageFilter: "",
  albumFilter: "",
  filterTerm: "",
};

export const mu = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setArtistFilter: (state, action: PayloadAction<FilterState>) => {
      state.artistFilter = action.payload.artistFilter;
    },
    setLanguageFilter: (state, action: PayloadAction<FilterState>) => {
      state.languageFilter = action.payload.languageFilter;
    },
    setAlbumFilter: (state, action: PayloadAction<FilterState>) => {
      state.albumFilter = action.payload.albumFilter;
    },
    setFilterTerm: (state, action: PayloadAction<FilterState>) => {
      state.filterTerm = action.payload.filterTerm;
    },
  },
});

export const {
  setArtistFilter,
  setLanguageFilter,
  setAlbumFilter,
  setFilterTerm,
} = mu.actions;
export default mu.reducer;
