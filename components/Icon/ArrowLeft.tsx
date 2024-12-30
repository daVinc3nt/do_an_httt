interface IconProps {
	height: number;
	width: number;
	color?: string;
}

const ArrowLeftIcon: React.FC<IconProps> = (props) => {
	const IconStyle = {
		height: `${props.height * 4}px`,
		width: `${props.width * 4}px`,
		color: `${props.color}`,
	};
	return (
		<svg
			style={IconStyle}
			className="w-6 h-6 text-gray-800 dark:text-white"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			viewBox="0 0 24 24">
			<path
				fillRule="evenodd"
				d="M13.729 5.575c1.304-1.074 3.27-.146 3.27 1.544v9.762c0 1.69-1.966 2.618-3.27 1.544l-5.927-4.881a2 2 0 0 1 0-3.088l5.927-4.88Z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export default ArrowLeftIcon;
