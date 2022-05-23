import './Button.css'

interface ButtonProps{
    type: 'primary'|'secondary'|'danger',
    label: string,
    action: () => void
}
const Button = ({type, label, action}: ButtonProps) => {
  return (
    <button className={type} onClick={action}>
        {label}
    </button>
  )
}

export default Button