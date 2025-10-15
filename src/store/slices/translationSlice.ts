import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

interface TranslateHistoryItem {
    id: string
    from: string
    to: string
    text: string
    result: string
}

interface TranslateState {
    result: string
    text: string
    from: string
    to: string
    loading: boolean
    error: string | null
    history: TranslateHistoryItem[]
}


const loadHistory = (): TranslateHistoryItem[] => {
    const data = localStorage.getItem("translation_history")
    return data? JSON.parse(data) : []
}

const saveHistory = (history: TranslateHistoryItem[]): void => {
    localStorage.setItem('translation_history', JSON.stringify(history))
}

const initialState: TranslateState = {
    result: '',
    text: '',
    from: '',
    to: '',
    loading: false,
    error: null,
    history: loadHistory()
}



interface TranslationPayload {
    from: string
    to: string
    text: string
}

export const translateText = createAsyncThunk<string, TranslationPayload>(
    'translate/translateText',
    async ({ from, to, text }) => {
    const response = await axios.post(
      'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
      { from, to, text },
      {
        headers: {
          'x-rapidapi-key': 'cc194e3448msh8439109698d499dp180ff9jsn319f39ec04e5',
          'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
      }
    );
    return  response.data.trans;

  }
)


const translateSlice = createSlice({
    name: 'translate',
    initialState, 
    reducers: {
        setFrom: (state, action) => {
            state.from = action.payload
        },
        setTo: (state, action) => {
            state.to = action.payload
        },
        setText: (state, action) => {
            state.text = action.payload
            if(!action.payload){
                state.result = ''
            }
        },
        swapLanguages: (state) => {
            [state.from, state.to] = [state.to, state.from];
            [state.text, state.result] = [state.result, state.text];
        },
        clearHistory: (state) => {
            state.history = []
            saveHistory([])
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(translateText.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(translateText.fulfilled, (state, action) => {
            state.loading = false
            state.result = action.payload

            const newTranslate: TranslateHistoryItem = {
                id: uuidv4(),
                from: state.from,
                to: state.to,
                text: state.text,
                result: state.result
            }

            state.history.unshift(newTranslate)
            saveHistory(state.history)
        })
        .addCase(translateText.rejected, (state) => {
            state.loading = false
            state.error = 'ERROR'
        })
    }
})

export const { setFrom, setTo, setText, swapLanguages, clearHistory } = translateSlice.actions

export default translateSlice.reducer