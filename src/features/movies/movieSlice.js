import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MovieApi from '../../common/apis/MovieApi';
import { APIKey } from '../../common/apis/MovieApiKey';

export const fetchAsyncMovie = createAsyncThunk('movies/fetchAsyncMovie', async () => {
    const movieText = "Harry";

    const response = await MovieApi
        .get(`?apikey=${APIKey}&s=${movieText}&type=movie`)
    return response.data;
})

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async () => {
    const seriesText = "Friends";

    const response = await MovieApi
        .get(`?apikey=${APIKey}&s=${seriesText}&type=series`)
    return response.data;
})

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async (id) => {

    const response = await MovieApi
        .get(`?apikey=${APIKey}&i=${id}&Plot=full`)
    return response.data;
})

const initialState = {
  movies: {},
  shows : {},
  selectedMovieOrShow : {},
}

export const movieSlice = createSlice({
    name : "movies",
    initialState,
    reducers : {
        // addMovies: (state, action) => {
        //     state.movies = action.payload;
        // },
        removeSelectedMovieOrShow : (state) => {
            state.selectedMovieOrShow = {};
        }
    },
    extraReducers : {
        [fetchAsyncMovie.pending] : () => {
        },
        [fetchAsyncMovie.fulfilled] : (state, actions) => {
            return {...state, movies : actions.payload};
        },
        [fetchAsyncMovie.rejected] : () => {
        },

        [fetchAsyncShows.pending] : () => {
        },
        [fetchAsyncShows.fulfilled] : (state, actions) => {
            return {...state, shows : actions.payload};
        },
        [fetchAsyncShows.rejected] : () => {
        },

        [fetchAsyncMovieOrShowDetail.fulfilled] : (state, actions) => {
            return {...state, selectedMovieOrShow : actions.payload};
        },
    },
});

// export const {addMovies} = movieSlice.actions;
export const {removeSelectedMovieOrShow} = movieSlice.actions;

export const getAllMovies= (state) => state.movies.movies;
export const getAllShows= (state) => state.movies.shows;
export const getSelectedMovieOrShow= (state) => state.movies.selectedMovieOrShow;

export default movieSlice.reducer;