import { Route, Routes } from 'react-router-dom'
import LanguageSelector from './ui/LanguageSelector/LanguageSelector'
import History from './pages/History/History'

const App = () => {
    return (
        <Routes>
            <Route index path='/' element={<LanguageSelector/>}/>
            <Route  path='/history' element={<History/>}/>
        </Routes>
    )
}

export default App

// https://www.youtube.com/watch?v=7uiM8BJ_ZMM&list=PLuY6eeDuleIMtvOvJBAbakwcIdEt7IAXT -- первые 3 части