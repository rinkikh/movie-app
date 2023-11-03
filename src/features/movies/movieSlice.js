import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieapi from '../../common/apis/movieapi'
import { APIKey } from '../../common/apis/moviesapikey'

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', 
async (term) => {

       const response = await movieapi
        .get(`?apikey=${APIKey}&s=${term}&type=movie`)
    return response.data //dispatch an action

})

export const fetchAsyncShows = createAsyncThunk(
    "movies/fetchAsyncShows",
    async (term) => {
      const response = await movieapi.get(
        `?apiKey=${APIKey}&s=${term}&type=series`
      );
      return response.data;
    }
  );

  export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    "movies/fetchAsyncMovieOrShowDetail",
    async (id) => {
      const response = await movieapi.get(`?apiKey=${APIKey}&i=${id}&plot=full`);
      return response.data;
    }
  );
  

const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {},

}

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
      
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieOrShow = {};
          },

    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("Pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully!");
            return { ...state, movies: payload };
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("Rejected!");
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully!");
            return { ...state, shows: payload };
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully!");
            return { ...state, selectMovieOrShow: payload };
        },
    },
})

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;