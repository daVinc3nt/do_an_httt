interface IconProps {
	height: number;
	width: number;
	color?: string;
}

const LogoutIcon: React.FC<IconProps> = (props) => {
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
			fill="none"
			viewBox="0 0 24 24">
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
			/>
		</svg>
	);
};

export default LogoutIcon;
