const Button = ({ type, btnText, onClick, disabled }) => {
	return (
		<button type={type} className='btn' onClick={onClick} disabled={disabled}>
			{btnText}
		</button>
	);
};

export default Button;
