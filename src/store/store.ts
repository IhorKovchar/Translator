import { configureStore } from "@reduxjs/toolkit"
import languageReducer from './slices/languageSlice'
import translateReducer from './slices/translationSlice'

export const store = configureStore({
    reducer: {
        language: languageReducer,
        translate: translateReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
