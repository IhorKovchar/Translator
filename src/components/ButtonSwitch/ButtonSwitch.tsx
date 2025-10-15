import './ButtonSwitch.scss'
interface ButtonSwitchProps{
    onClick?: () => void
}

const ButtonSwitch = ({onClick}: ButtonSwitchProps) => {
    return (
        <button className="switchButton" onClick={onClick}>Switch</button>
    )
}

export default ButtonSwitch


