import { useState,useEffect, useRef } from "react";
import './LanguageSearch.scss'

interface Language {
    code: string;
    language: string
}

interface LanguageSearchProps {
    languages: Language[]
    value: string
    onChange: (value: string) => void
    placeholder: string
    hideAuto?: boolean
    isOpen: boolean
    onToggle: () => void
    onClose: () => void
}

const LanguageSearch =( { languages, value, onChange, placeholder, hideAuto, isOpen, onToggle, onClose }: LanguageSearchProps) => {
    const [ search, setSearch ] = useState('')
     const wrapperRef = useRef<HTMLDivElement>(null)

    const selected = languages.find(language => language.code === value)


    const filteredLanguages = languages
        .filter(language => language.language.toLowerCase().includes(search.toLowerCase())
        )
        .filter(language => !(hideAuto && language.code === "auto"))
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                onClose()
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen, onClose])

    return (
        <div className="languageSearch" ref={wrapperRef}>  
            <div className="languageSearch__selected" onClick={onToggle}>
                {selected ? selected.language : placeholder}
            </div>
            {isOpen && (
                <div className="languageSearch__items">
                    <input
                        type="text"
                        placeholder="Search..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="languageSearch__input"
                    />

                    <ul className="languageSearch__list">
                        {filteredLanguages.map(language => (
                            <li 
                                className="languageSearch__item" 
                                key={language.code} 
                                onClick={() => {
                                    setSearch('')
                                    onChange(language.code)
                                    onClose()
                                }}
                            >
                                {language.language}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default LanguageSearch