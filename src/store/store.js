import {
    configureStore,
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, API_KEY } from "./Requestdata";
import UserSlicer from './UserSlicer'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import PaymentSlicer from "./PaymentSlicer";

const persistConfig = {
    key: 'root',
    storage,
}

export const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

export const getGenres = createAsyncThunk("filmyverse/genres", async () => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=2f1f62b5a54f31e7f6836c9e757a21a7`
    );
    console.log(data);
});
export const getMovies = createAsyncThunk(
    "filmyverse/trending",
    async ({ type }, thunkAPI) => {
        const {
            filmyverse: { genres },
        } = thunkAPI.getState();
        return getRawData(
            `${API_URL}/trending/${type}/week?api_key=${API_KEY}`,
            genres,
            true
        );
    }
);

const getRawData = async (api, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const {
            data: { results },
        } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
        createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
};

const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) movieGenres.push(name.name);
        });
        if (movie.backdrop_path)
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
            });
    });
};

const filmyverseSlice = createSlice({
    name: "filmyverse",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = false;
        });
        builder.addCase(getMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
});

const persistedFilmyverseReducer = persistReducer(persistConfig, filmyverseSlice.reducer);
const persistedUserReducer = persistReducer(persistConfig, UserSlicer.reducer);
const persistedPraymentReceiptReducer = persistReducer(persistConfig, PaymentSlicer.reducer);


export const store = configureStore({
    reducer: {
        filmyverse: persistedFilmyverseReducer,
        User: persistedUserReducer,
        PaymentReceipt: persistedPraymentReceiptReducer
    },
});

export const persistor = persistStore(store)