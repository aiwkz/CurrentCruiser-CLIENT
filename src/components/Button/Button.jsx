import './Button.css';

const Button = ({ children, onClick }) => <button onClick={onClick} className='Button'>{children}</button>;

export default Button;
