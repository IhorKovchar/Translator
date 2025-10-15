import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { Link } from 'react-router-dom'
import { clearHistory } from '../../store/slices/translationSlice'
import './History.scss'



const History = () => {
    const history = useSelector((state: RootState) => state.translate.history)
    const dispatch = useDispatch()

    return (
        <div className='history'>
            <h2>History</h2>
            <div className='history__buttons'>
                <Link to="/">⬅ Back</Link>

                {history.length > 0 && (
                    <button onClick={() => dispatch(clearHistory())}>
                        Clear History
                    </button>
                )}
            </div>

            {
                history.length === 0 ?(
                    <p>Empty</p>
                ) : (
                    <ul className='history__list'>
                        {history.map((history) => (
                            <li className='history__item'>
                                {history.result}
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}

export default History

// useMemo, reselect redux