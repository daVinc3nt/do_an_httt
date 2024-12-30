import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";

interface SwitchInterface {
	size: number;
	value: boolean;
	setValue: Dispatch<SetStateAction<boolean>>;
	id: string;
}

export default function Switch({ size, value, setValue, id }: SwitchInterface) {
	const switchStyle = {
		height: `${size * 4}px`,
		width: `${size * 7}px`,
	};
	const knotStyle = {
		height: `${size * 3}px`,
		width: `${size * 3}px`,
	};
	return (
		<button
			style={switchStyle}
			className={`w-[20px] h-[28px] flex flex-row ${value ? "justify-end" : "justify-start"} duration-200 items-center py-1 px-px  ${value ? "bg-do_600" : "bg-white"} duration-200 border-2 border-do_600 rounded-full`}
			onClick={() => setValue((prevVal) => !prevVal)}>
			<motion.div
				layoutId={id}
				transition={{ duration: 0.2 }}
				style={knotStyle}
				className={`w-5 h-5 rounded-full ${value ? "bg-white" : "bg-do_600"}`}
			/>
		</button>
	);
}
