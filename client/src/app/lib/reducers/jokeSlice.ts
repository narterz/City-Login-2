import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Joke } from "@/app/types";

const initialState = {
    jokeArray: [],
    index: 0
} as Joke;


export const JokeSlice = createSlice({
    name: "jokes",
    initialState,
    reducers: {
        appendJoke: (state, action: PayloadAction<string[]>) => {
            state.jokeArray = [...state.jokeArray, ...action.payload];
        },
        nextJoke: (state) => {
            state.index = state.index + 1
        },
        clearState: (state) => {
            state.jokeArray = [];
            state.index = 0;
        }
    },
});

export const { appendJoke, clearState, nextJoke } = JokeSlice.actions;
export default JokeSlice.reducer;
export const jokeSelector = (state: RootState) => state.jokes;