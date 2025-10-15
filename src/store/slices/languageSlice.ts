import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import  axios  from 'axios'

interface Language {
    code: string;
    language: string;
}

interface LanguageState {
    languages: Language[];
    loading: boolean;
    error: string | null
}

const initialState: LanguageState = {
    languages: [],
    loading: false,
    error: null
}


export const fetchLanguages = createAsyncThunk<Language[]>(
    'language/fetchLangauges',
    async () => {
        const response = await axios.request({
            method: 'GET',
            url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/support-languages',
            headers: {
            'x-rapidapi-key': 'cc194e3448msh8439109698d499dp180ff9jsn319f39ec04e5',
            'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
            },
        });

        return response.data
    }
)

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchLanguages.fulfilled, (state, action) => {
            state.loading = false
            state.languages = action.payload
        })
        .addCase(fetchLanguages.pending, (state) => {
            state.loading = true   
            state.error = null
        })
        .addCase(fetchLanguages.rejected, (state) => {
            state.loading = false
            state.error = 'Error loading languages'
        })
    }
})

export default languageSlice.reducer