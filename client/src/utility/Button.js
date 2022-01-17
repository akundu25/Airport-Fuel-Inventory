const Button = ({ type, btnText, onClick, disabled, className }) => {
	return (
		<button
			type={type}
			className={className}
			onClick={onClick}
			disabled={disabled}
		>
			{btnText}
		</button>
	);
};

export default Button;
