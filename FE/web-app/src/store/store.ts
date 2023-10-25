import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './slices/alert';

const store = configureStore({
    reducer: {
        alert: alertReducer,
    },
});

export default store;