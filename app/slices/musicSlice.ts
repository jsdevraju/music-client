import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMusic } from "../utils";

export interface MusicState {
  allSongs: IMusic[] | undefined;
  song: number;
  isSongPlaying: boolean;
  miniPlayer: boolean;
}

const initialState: MusicState = {
  allSongs: undefined,
  song: 0,
  isSongPlaying: false,
  miniPlayer: false,
};

export const musicSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPlaySong: (state: MusicState, action: PayloadAction<MusicState>) => {
      state.isSongPlaying = action.payload.isSongPlaying
    },
    setMiniPlayer: (state: MusicState, action: PayloadAction<MusicState>) => {
      state.miniPlayer = action.payload.miniPlayer
    },
    setSong: (state: MusicState, action: PayloadAction<MusicState>) => {
      state.song = action.payload.song
    },
    setAllSong: (state: MusicState, action: PayloadAction<MusicState>) => {
      state.allSongs = action.payload.allSongs
    },
  },
})

export const { setPlaySong, setMiniPlayer, setSong, setAllSong } = musicSlice.actions;
export default musicSlice.reducer;

