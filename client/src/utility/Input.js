const Input = ({ name, label, type, placeholder, value, onChange }) => {
	return (
		<label htmlFor={name}>
			{label}
			<input
				id={name}
				name={name}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required
			/>
		</label>
	);
};

export default Input;
