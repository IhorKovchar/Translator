import { useEffect, useState } from 'react'
import './LanguageSelector.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLanguages } from '../../store/slices/languageSlice';
import type { AppDispatch, RootState } from '../../store/store';
import { setFrom, setText, setTo, translateText, swapLanguages } from '../../store/slices/translationSlice';
import LanguageSearch from '../../components/LanguageSearch/LanguageSearch';
import ButtonSwitch from '../../components/ButtonSwitch/ButtonSwitch';
import { Link } from 'react-router-dom'
 
const LanguageSelector = () => {
    const dispatch = useDispatch<AppDispatch>()
    const languages = useSelector((state: RootState) => state.language.languages)
    const from = useSelector((state: RootState) => state.translate.from)
    const to = useSelector((state: RootState) => state.translate.to)
    const text = useSelector((state: RootState) => state.translate.text)
    const translate = useSelector((state: RootState) => state.translate.result)
    const [openSelect, setOpenSelect] = useState<"from" | "to" | null>(null);

    useEffect(() => {
        dispatch(fetchLanguages()) 
    }, [dispatch])

    useEffect(() => {
        if(text && from && to){
            const timeout = setTimeout(() => {
                dispatch(translateText({from, to, text}))
            }, 1000)
            return () => clearTimeout(timeout)
        }
    }, [text, from, to, dispatch])

    const handleSwap = () => {
        dispatch(swapLanguages())
    }

    return (
        <div className='translateContainer'>
            <ButtonSwitch onClick={handleSwap}/> 
            <div className='translateContainer__languageSelector'>
                <LanguageSearch
                    languages={languages}
                    value={from}
                    onChange={(value) => dispatch(setFrom(value))}
                    placeholder='From'
                    isOpen={openSelect === "from"}
                    onToggle={() => setOpenSelect(openSelect === "from" ? null : "from")}
                    onClose={() => setOpenSelect(null)}
                />
                <LanguageSearch
                    languages={languages}
                    value={to}
                    onChange={(value) => dispatch(setTo(value))}
                    placeholder='To'
                    hideAuto={true}
                    isOpen={openSelect === "to"}
                    onToggle={() => setOpenSelect(openSelect === "to" ? null : "to")}
                    onClose={() => setOpenSelect(null)}
                />
            </div>  
            <div className='translateContainer__translate'>
                <textarea
                    value={text}
                    onChange={(e) => dispatch(setText(e.target.value))}
                    placeholder='write your text'
                    className='translateContainer__item'
                />

                <textarea className='translateContainer__item'
                    value={translate}
                    readOnly
                />
            </div>

            <Link to='/history'>
                <button className='history__button'>
                    Open History
                </button>
            </Link>
        </div>
    )
}

export default LanguageSelector

// REACT-SAY СПРОЙБУЙ ОБОВ'ЯЗКОВО

// main — стабильный код, готовый к релизу.
// develop (в некоторых командах) — основная ветка разработки.
// feature/* — новые фичи (feature/login, feature/search).
// bugfix/* — исправления багов.
// release/* — подготовка релиза (тесты, документация).
// hotfix/* — срочные исправления прямо в продакшн.