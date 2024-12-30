"use client";
import {
	motion,
	useInView,
	useAnimation,
	TargetAndTransition,
	delay,
} from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
	children: JSX.Element;
	width?: "fit-content" | "100%";
	overflow?: "hidden" | "visible";
	className?: string;
	whileHover?: TargetAndTransition;
	delay?: number;
}

export default function EaseIn({
	children,
	width,
	overflow,
	className,
	whileHover,
	delay,
}: Props) {
	const contentRef = useRef();
	const inView = useInView(contentRef, { once: true });
	const animationControl = useAnimation();

	useEffect(() => {
		if (inView) {
			animationControl.start("visible");
		}
	}, [inView]);

	const variants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { delay: delay } },
	};

	return (
		<div
			ref={contentRef}
			style={{ position: "relative", width, overflow }}
			className={className}>
			<motion.div
				variants={variants}
				initial="hidden"
				animate={animationControl}
				whileHover={whileHover}>
				{children}
			</motion.div>
		</div>
	);
}
